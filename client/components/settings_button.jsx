import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

export default function SettingsButton() {
    return (
        <div className="bg-bg2 flex items-center justify-start p-6 rounded-lg hover:bg-send-blue cursor-pointer hover:text-black">
            <FontAwesomeIcon icon={faGear} className="text-3xl mr-5" />
            <p>Settings</p>
        </div>
    );
}
