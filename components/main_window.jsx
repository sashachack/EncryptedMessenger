import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function MainWindow({ name }) {
    const [message, setMessage] = useState("");

    return (
        <div className="flex-grow bg-bg2 flex items-center p-4 px-5 rounded-lg flex-col justify-between">
            <div className="w-full flex justify-between items-center">
                <p className="text-2xl font-bold">{name}</p>
                <FontAwesomeIcon icon={faLock} />
            </div>
            <div>Hi</div>
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
                    />
                </div>
            </div>
        </div>
    );
}
