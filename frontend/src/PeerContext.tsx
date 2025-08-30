import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import {Peer} from 'peerjs'

interface PeerContextType {
  peer: Peer;
  sharedStream: MediaStream | null;
  getSharedStream: () => Promise<MediaStream>;
  peerConnections: Map<string, RTCPeerConnection>;
  createOrGetPeerConnection: (peerId: string) => RTCPeerConnection;
  monitorPeerStats: (peerId: string) => void;
  mediaError: string | null;
  requestMediaPermissions: () => Promise<void>;
}

const peer = new Peer();
let sharedStreamInstance: MediaStream | null = null;

const PeerContext = createContext<PeerContextType | null>(null);

const PeerProvider = ({ children }: any) => {
  const [sharedStream, setSharedStream] = useState<MediaStream | null>(null);
  const [mediaError, setMediaError] = useState<string | null>(null);
  const peerConnections = useRef(new Map<string, RTCPeerConnection>());
  const statsInterval = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const requestMediaPermissions = async (): Promise<void> => {
    setMediaError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: { width: 1280, height: 720, frameRate: 30 }
      });
      sharedStreamInstance = stream;
      setSharedStream(stream);
      console.log('Media permissions granted successfully');
    } catch (error: any) {
      console.error('Error accessing media devices:', error);
      let errorMessage = 'Unable to access camera and microphone';
      
      if (error.name === 'NotAllowedError') {
        errorMessage = 'Camera and microphone access was denied. Please allow permissions and refresh the page.';
      } else if (error.name === 'NotFoundError') {
        errorMessage = 'No camera or microphone found. Please connect a device and try again.';
      } else if (error.name === 'NotReadableError') {
        errorMessage = 'Camera or microphone is already in use by another application.';
      }
      
      setMediaError(errorMessage);
      
      // Try audio-only as fallback
      try {
        const audioStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false
        });
        sharedStreamInstance = audioStream;
        setSharedStream(audioStream);
        console.log('Audio-only stream created as fallback');
      } catch (audioError) {
        console.error('Audio-only fallback also failed:', audioError);
        setMediaError('Unable to access any media devices. Please check your browser permissions.');
      }
    }
  };

  const getSharedStream = async (): Promise<MediaStream> => {
    if (sharedStreamInstance) return sharedStreamInstance;
    
    await requestMediaPermissions();
    if (sharedStreamInstance) {
      return sharedStreamInstance;
    }
    
    throw new Error('Failed to get media stream');
  };

  const createOrGetPeerConnection = (peerId: string): RTCPeerConnection => {
    if (peerConnections.current.has(peerId)) {
      return peerConnections.current.get(peerId)!;
    }

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed') {
        peerConnections.current.delete(peerId);
        if (statsInterval.current.has(peerId)) {
          clearInterval(statsInterval.current.get(peerId)!);
          statsInterval.current.delete(peerId);
        }
      }
    };

    peerConnections.current.set(peerId, pc);
    return pc;
  };

  const monitorPeerStats = (peerId: string) => {
    const pc = peerConnections.current.get(peerId);
    if (!pc || statsInterval.current.has(peerId)) return;

    const interval = setInterval(async () => {
      try {
        const stats = await pc.getStats();
        let outboundRtp = null;
        
        stats.forEach(report => {
          if (report.type === 'outbound-rtp' && report.kind === 'video') {
            outboundRtp = report;
          }
        });

        if (outboundRtp && sharedStreamInstance) {
          const videoTrack = sharedStreamInstance.getVideoTracks()[0];
          if (videoTrack && videoTrack.enabled) {
            const bitrate = outboundRtp.bytesSent * 8 / 1000;
            
            if (bitrate < 100) {
              videoTrack.enabled = false;
              console.log(`Disabled video for ${peerId} due to poor connection`);
            }
          }
        }
      } catch (error) {
        console.error(`Stats monitoring error for ${peerId}:`, error);
      }
    }, 5000);

    statsInterval.current.set(peerId, interval);
  };

  const contextValue: PeerContextType = {
    peer,
    sharedStream,
    getSharedStream,
    peerConnections: peerConnections.current,
    createOrGetPeerConnection,
    monitorPeerStats,
    mediaError,
    requestMediaPermissions
  };

  return (
    <PeerContext.Provider value={contextValue}>{children}</PeerContext.Provider>
  );
};

const usePeerContext = () => {
  const context = useContext(PeerContext);
  if (!context) {
    throw new Error('usePeerContext must be used within PeerProvider');
  }
  return context;
};

export { PeerContext, PeerProvider, usePeerContext };
