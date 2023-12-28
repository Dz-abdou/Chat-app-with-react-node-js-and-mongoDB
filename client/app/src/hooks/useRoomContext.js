import { RoomContext } from "../context/RoomContext"
import { useContext } from "react"

export const useAuthContext = () => {
    const context = useContext(RoomContext);
    
    if(!context) {
        throw Error('There is no room selected, please select a room first.');
    }

    return context;
}