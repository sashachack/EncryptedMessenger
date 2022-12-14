import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useContext, useRef } from "react";
import SocketContext from "../context/SocketContext";
import UserContext from "../context/UserContext";
import { asymm_decrypt, asymm_encrypt } from "../functions/encryption";

const Message = ({ message, friendPuk }) => {
    const { text, fromMe } = message;
    const user = useContext(UserContext);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        const decodeMessage = async () => {
            if (fromMe) {
                setMsg(text);
            } else {
                const dec = await asymm_decrypt(text, user.userPik);
                setMsg(dec);
            }
        };
        decodeMessage();
    }, []);

    if (!fromMe) {
        return (
            <div
                className={`max-w-[600px] break-words p-2 rounded-xl ${
                    fromMe
                        ? "bg-send-blue self-end rounded-tr-[0px]"
                        : "bg-soft-red self-start rounded-tl-[0px]"
                } `}
            >
                {msg}
            </div>
        );
    }
};

const Messages = ({ messages, friendPuk }) => {
    return (
        <div
            // ref={ref}
            className="flex flex-col h-full w-full gap-4 overflow-y-scroll no-scrollbar pb-4 py-2"
        >
            {messages &&
                messages.map((message, i) => (
                    <Message key={i} message={message} friendPuk={friendPuk} />
                ))}
        </div>
    );
};

export default function MainWindow({
    convos,
    selectedFriendID,
    selectedFriendPuk,
    setSelectedFriendPuk,
}) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState(null);
    const socket = useContext(SocketContext);
    const user = useContext(UserContext);

    const messageGrabbing = async () => {
        const grabMessages = async () => {
            let data = { uid: user.id, ouid: selectedFriendID };
            const res = await fetch("/api/get_messages", {
                method: "POST",
                body: JSON.stringify(data),
            });

            const body = res.json();
            console.log(body);
            return body;
        };

        grabMessages().then((res) => {
            console.log(res.data);
            let marr = res.data;
            setMessages(marr);
        });
    };

    useEffect(() => {
        messageGrabbing();
    }, [selectedFriendID]); //selectedFriendID

    useEffect(() => {
        socket.on("receive_message", (data) => {
            messageGrabbing();
        });
    }, []);

    let send = async () => {
        if (message == "") {
            return;
        }

        const sendSocketMessage = (e) => {
            console.log("Send message: " + message);
            const data = {
                message: message,
                uid: user.id,
                ouid: selectedFriendID,
                fromMe: true,
            };
            socket.emit("send_message", { data: data });
        };

        sendSocketMessage();

        const sendDBMessage = async (e) => {
            console.log("sendDBMessage");
            if (selectedFriendPuk == null) {
                console.log("No friend puk");
                return;
            }
            console.log(message);
            const encrypted = await asymm_encrypt(message, selectedFriendPuk);
            console.log(encrypted);

            let data = {
                uid: user.id,
                ouid: selectedFriendID,
                message: encrypted,
            };
            console.log("payload;");
            console.log(data);
            const res = await fetch("/api/send_message", {
                method: "POST",
                body: JSON.stringify(data),
            });
            const body = res.json();
            console.log("BODY:");
            console.log(body);
            return body;
        };

        let res = await sendDBMessage();
        console.log(res);
        console.log(res.data);
        let marr = res.data;
        console.log(marr);
        setMessages(marr);
        setMessage("");
    };
    if (selectedFriendID == -1) return <div></div>;
    else {
        return (
            <div className="flex-grow bg-bg2 flex items-center p-4 pt-[0.7rem] px-5 rounded-lg flex-col justify-between">
                <div className="w-full flex justify-between items-center">
                    <p className="text-2xl font-bold">
                        {user.friends &&
                            user.friends.map((friend) => {
                                friend = friend[0];
                                if (friend.id == selectedFriendID) {
                                    return friend.username;
                                }
                            })}
                    </p>
                    <FontAwesomeIcon icon={faLock} />
                </div>

                <Messages messages={messages} friendPuk={selectedFriendPuk} />
                <div className="flex items-center justify-between w-full">
                    <input
                        type="text"
                        value={message}
                        placeholder="Type something..."
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-grow bg-bg3 p-2 px-[1rem] rounded-full mr-3 text-text-grey2 focus:border-transparent placeholder-text-grey focus:outline-none"
                        onKeyDown={(e) => e.key === "Enter" && send()}
                    ></input>
                    <div
                        className="bg-send-blue rounded-full p-[1.2rem] w-[30px] h-[30px] flex items-center justify-center
                cursor-pointer hover:bg-green-200 hover:text-black"
                    >
                        <FontAwesomeIcon
                            icon={faPaperPlane}
                            className="translate-x-[-1px]"
                            onClick={send}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
