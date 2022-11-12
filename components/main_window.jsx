import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

export default function MainWindow({ name }) {
    return (
        <div className="bg-primary flex items-center p-2 rounded-lg b flex-col justify-between">
            <div className="w-full flex justify-between items-center">
                <p className="text-xl font-bold">{name}</p>
                <FontAwesomeIcon icon={faLock} />
            </div>
            <div>Hi</div>
            <div>Hi</div>
        </div>
    );
}
