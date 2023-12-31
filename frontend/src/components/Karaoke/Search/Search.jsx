import { React, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { getVideoThunk, syncVideo } from '../../../redux/Video/Video.action';
import Video from '../Video/Video';
import Queue from '../Queue/queue';
import { SocketContext } from '../../../context';
import './search.css';

const Search = ({ roomId }) => {
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const [link, setLink] = useState('');
  const [links, setLinks] = useState([]);

  const handleInput = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearch = async (event) => {

    dispatch(getVideoThunk(keyword, socket, roomId));
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSearch();
    }
  };
  // search component
  // video links -
  // useEffect(() => {
  //   socket.on('link', (link) => {
  //     setLinks((links) => [...links, link]);
  //   });

  //   return () => {
  //     socket.off('link');
  //   };
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('chatMessage', { room, message });
    setLinks('');
  };

  return (
    <div className="col-md-8">
      <div className='flex w-screen'>
        <div className='flex flex-col w-3/4 mx-3'>
          <div className="d-flex form-inputs">
            <input
              className="form-control"
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder="Search for music..."
            />
            <button className="btn-search ml-2" onClick={handleSearch}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </div>
          {/* <Video roomId={roomId} /> */}
          <Video/>
        </div>
        <div className="w-1/4 mx-3">
          <Queue />
        </div>
      </div>
    </div>
  );
};

export default Search;
