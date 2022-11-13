import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function MainWindow({ name }) {
    return (
        <div className="flex-grow bg-bg2 flex items-center p-4 px-5 rounded-lg flex-col justify-between">
            <div className="w-full flex justify-between items-center">
                <p className="text-2xl font-bold">{name}</p>
                <FontAwesomeIcon icon={faLock} />
            </div>
            <div>Hi</div>
            <div className="flex items-center justify-between w-full">
                <div className="flex-grow bg-bg3 p-2 px-3 rounded-full mr-3 text-text-grey">
                    Type something...
                </div>
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
