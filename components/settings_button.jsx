import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

export default function SettingsButton() {
    return (
        <div className="bg-bg2 flex items-center justify-start p-3 rounded-lg">
            <FontAwesomeIcon icon={faGear} className="text-2xl mr-2" />
            <p>Settings</p>
        </div>
    );
}
