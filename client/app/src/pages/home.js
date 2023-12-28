import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { useFetch } from '../hooks/useFetchPost';
import { useFetchGet } from '../hooks/useFetchGet';
import { SocketContext } from '../context/SocketContext';
import { RoomContext } from '../context/RoomContext';
import { useAuthContext } from '../hooks/useAuthContext';


export default function HomePage() {

  const history = useHistory();
  const { myFetch, error, isLoading } = useFetch();
  const { myFetchGet, error2, isLoading2 } = useFetchGet();
  const [userRooms, setUserRooms] = useState([]);
  const [selectRoom, setSelectRoom] = useState('');
  const [inputRoom, setInputRoom] = useState('');
  const socket = useContext(SocketContext);
  const { room, setRoom } = useContext(RoomContext);
  const { user } = useAuthContext();

  useEffect(() => {
    myFetchGet(`http://localhost:8000/getRooms?username=${user.username}`, 'GET', { username: user.username })
      .then(rooms => {
        setUserRooms(rooms)
      });
  }, []);


  const joinRoom = async (roomID) => {
    if (!roomID) {
      alert('Veuillez sélectionner un salon')
    } else {
      await myFetch('http://localhost:8000/addRoom', 'POST', { room: roomID, username: user.username });
      socket.emit('join-room', { username: user.username, room: roomID }, error => {
        if (error) {
          console.log(error)
        } else {
          setRoom(roomID);
          history.push('/chat')
        }
      });
    }
  }

  return (
    <div className="form">
      <label >My rooms</label> <br />
      <select
        name="Mes salons"
        onChange={e => setSelectRoom(e.target.value)}
        value={selectRoom}
      >
        <option value={''}></option>
        {userRooms.length > 0 && userRooms.map((item) =>
          <option value={item}>{item}</option>
        )}
      </select>
      <div className="button-container">
        <input type="submit" value='joindre' onClick={() => joinRoom(selectRoom)} />
      </div>
      <center><br /><label >OU</label></center>
      <div className="input-container">
        <label>nouvelle salle de discussion</label>
        <input
          type="text"
          name="New room"
          placeholder='Entrer le nom du salon'
          value={inputRoom}
          onChange={e => setInputRoom(e.target.value)} />
      </div>
      <div className="button-container">
        <input type="submit" value='joindre' onClick={() => joinRoom(inputRoom)} />
      </div>
    </div>
  )
}