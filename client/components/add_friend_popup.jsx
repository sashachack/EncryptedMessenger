import { useContext, useState } from "react";
import SocketContext from "../context/SocketContext";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function AddFriendPopup({setShowAdd}) {
    const [fuser, setFUser] = useState("");
    const socket = useContext(SocketContext);
    return (
        <div className="backdrop-blur-md inset-0 h-screen absolute w-screen flex justify-center m-auto items-center">   
            <div className="gap-4 p-10 bg-bg3 rounded-lg flex flex-col justify-center items-center">
            <FontAwesomeIcon className="text-white cursor-pointer" icon={faArrowLeft}
            onClick = {(e) => setShowAdd(false)}/>
                <input
                    type="text"
                    value={fuser}
                    placeholder="Email"
                    onChange={(e) => setFUser(e.target.value)}
                    className="bg-bg2 rounded-full p-2 px-3 text-text-grey2 focus:border-transparent 
                        placeholder-text-grey focus:outline-none"
                ></input>
                <button
                    className="text-xl font-bold text-white p-2 rounded-lg"
                    onClick={(e) => {
                        setShowAdd(false);
                    }}
                >
                    Add Friend
                </button>
            </div>
        </div>
    );
}