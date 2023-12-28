
import React, { useState } from 'react'

const RoomContext = React.createContext()

const RoomProvider = ({ children }) => {
    const [room, setRoom] = useState('');
    console.log(`Selected Room : ${room}`);
    return (
        <RoomContext.Provider value={{ room, setRoom }}>
            {children}
        </RoomContext.Provider>
    )
}

export { RoomContext, RoomProvider };