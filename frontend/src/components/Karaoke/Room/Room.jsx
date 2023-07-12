import React from 'react'
import Video from '../Video/Video'
import Participants from '../Participants/Participants'
import Search from '../Search/Search'

// Future: search bar and queue option
const Room = () => {

  return (
    <div>
      <h1>Room</h1>
    <Search/>
    <Video/>
    <Participants/>

    </div>
    
  )
}

export default Room