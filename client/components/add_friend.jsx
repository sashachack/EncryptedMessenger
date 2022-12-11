import { useContext } from "react";
import { useState } from "react";
import SocketContext from "../context/SocketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

export default function AddFriend({friendModal, setFriendModal}) {
    const socket = useContext(SocketContext);

    const submit = async (e) => {
        e.preventDefault();
        setFriendModal(true)
        console.log("set modal")
        console.log(friendModal)
    }

    console.log(friendModal)

    return (
        <div className="bg-bg2 flex items-center justify-start p-4 rounded-lg hover:bg-send-blue cursor-pointer hover:text-black">
            <form onSubmit={submit}>
                <FontAwesomeIcon icon={faPlus} className="text-2xl mr-3" />
                <button>
                    <p>Add Friend</p>
                </button>
            </form>
        </div>
        
    );
}

// {showFriendModal ? (
//     <div className="mt-10 flex justify-center items-center flex-col w-72 rounded-lg shadow-xl h-auto p-2">
//     {/* <Image src={Trophy} width={100} height={100} objectFit="contain" /> */}
//     <h2 className="text-base mt-2 mx-4 text-gray-400 font-semibold text-center">
//         May your life be filled with success and achievements.
//         Congratulations!
//     </h2>
//     <button
//         className="my-5 w-auto px-8 h-10 bg-blue-600 text-white rounded-md shadow hover:shadow-lg font-semibold"
//         onClick={() => setFriendModal(false)}
//     >
//         Close
//     </button>
//     </div>
// ) : null}