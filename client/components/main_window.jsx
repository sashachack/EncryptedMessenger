import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useContext } from "react";
import SocketContext from "../context/SocketContext";

const Message = ({ message }) => {
    const { text, fromMe } = message;
    return (
        <div
            className={`p-2 rounded-xl ${
                fromMe
                    ? "bg-send-blue self-end rounded-tr-[0px]"
                    : "bg-soft-red self-start rounded-tl-[0px]"
            } `}
        >
            {text}
        </div>
    );
};

const Messages = ({ messages }) => {
    return (
        <div className="flex flex-col w-full h-full py-4 gap-4 justify-end">
            {messages.map((message) => (
                <Message key={message.id} message={message} />
            ))}
        </div>
    );
};

export default function MainWindow({ convos, selectedFriendID }) {
    const [message, setMessage] = useState("");
    const socket = useContext(SocketContext);

    const sendMessage = (e) => {
        console.log(e);
        // e.preventDefault();
        console.log("Send");
        socket.emit("send_message", { message: message });
    };

    return (
        <div className="flex-grow bg-bg2 flex items-center p-4 pt-[0.7rem] px-5 rounded-lg flex-col justify-between">
            <div className="w-full flex justify-between items-center">
                <p className="text-2xl font-bold">
                    {convos[selectedFriendID].name}
                </p>
                {/* /* <--- won't work later  */}
                <FontAwesomeIcon icon={faLock} />
            </div>
            <Messages messages={convos[selectedFriendID].messages} />
            <div className="flex items-center justify-between w-full">
                <input
                    type="text"
                    value={message}
                    placeholder="Type something..."
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-grow bg-bg3 p-2 px-3 rounded-full mr-3 text-text-grey2 focus:border-transparent 
                        placeholder-text-grey focus:outline-none"
                ></input>
                <div
                    className="bg-send-blue rounded-full p-[1.2rem] w-[30px] h-[30px] flex items-center justify-center
                cursor-pointer hover:bg-green-200 hover:text-black"
                >
                    <FontAwesomeIcon
                        icon={faPaperPlane}
                        className="translate-x-[-1px]"
                        onClick={() => {
                            const data = {
                                message: message,
                                sent_id: socket.id,
                                fromMe: true,
                            };
                            socket.emit("send_message", { data: data });
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
