import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

export default function SettingsButton() {
    return (
        <div className="bg-primary flex items-center justify-start p-2 pl-4 rounded-lg e">
            <FontAwesomeIcon icon={faGear} className="mr-2" />
            <p>Settings</p>
        </div>
    );
}
