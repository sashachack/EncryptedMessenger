import { useContext } from "react";
import { useState } from "react";
import SocketContext from "../context/SocketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

export default function AddFriend({ friendModal, setFriendModal }) {
    const socket = useContext(SocketContext);

    const submit = async (e) => {
        e.preventDefault();
        setFriendModal(true);
    };

    return (
        <div
            onClick={submit}
            className="bg-bg2 flex items-center justify-start p-4 rounded-lg hover:bg-send-blue cursor-pointer hover:text-black"
        >
            <FontAwesomeIcon icon={faPlus} className="text-2xl mr-3" />
            <button>
                <p>Add Friend</p>
            </button>
        </div>
    );
}
