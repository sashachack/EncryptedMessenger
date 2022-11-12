import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Search() {
    return (
        <div className="bg-primary flex items-center justify-start p-2 pl-4 rounded-lg a">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" />
            <p>Search</p>
        </div>
    );
}
