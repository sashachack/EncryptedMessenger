import { useContext } from "react";
import SocketContext from "../context/SocketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function AddFriend({setShowAdd}) {
    const socket = useContext(SocketContext);

    const show = () =>{
        setShowAdd(true);
    }

    return (
        <div className="bg-bg2 flex items-center justify-start p-4 rounded-lg hover:bg-send-blue cursor-pointer hover:text-black"
        onClick = {show}>
            <FontAwesomeIcon icon={faPlus} className="text-2xl mr-3" />
            <p>Add Friend</p>
        </div>
    );
}
