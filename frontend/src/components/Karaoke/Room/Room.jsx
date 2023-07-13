import React from 'react'
import Video from '../Video/Video'
import Participants from '../Participants/Participants'
import Search from '../Search/Search'
import Queue from '../Queue/queue'
import ShareButton from '../../ShareButton/ShareButton'

// Future: search bar and queue option
const Room = () => {

  return (
    <div>
      <h1>Room</h1>
    <ShareButton/>
    <Search/>
    <Queue/>
    <Video/>
    <Participants/>

    </div>
    
  )
}

export default Room