import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function InfoPanel() {
    const name = "Nash Solon";
    return (
        <div
            className="bg-bg2 flex flex-col items-center justify-start p-6 
        rounded-lg c w-[250px] text-center gap-4"
        >
            <FontAwesomeIcon icon={faUser} className="text-4xl" />
            <p className="text-xl font-bold">{name}</p>
            <button className="bg-soft-red text-white p-2 rounded-lg">
                Block User
            </button>
        </div>
    );
}
