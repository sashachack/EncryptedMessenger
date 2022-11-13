import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserVNeck } from "@fortawesome/free-solid-svg-icons";

function Friend({ name, curr }) {
    // const c = ` ${
    //     curr ? "bg-send-blue text-black" : " hover:bg-soft-red cursor-pointer"
    // } p-5 text-left w-full rounded-lg`;
    const c = ` ${
        curr ? "bg-soft-red text-black" : " cursor-pointer"
    } p-5 text-left rounded-lg`;
    return (
        <div className={c + " flex justify-start items-center w-full"}>
            <FontAwesomeIcon icon={faUserVNeck} className="text-3xl mr-5" />
            <div>{name}</div>
        </div>
    );
}

export default function Friends({ current_friend }) {
    current_friend = current_friend || "Nash Solon";
    const friends = [
        "Nash Solon",
        "Nisha Sahgal",
        "Kyle Montgomery",
        "Carson Brown",
        "Michael Schlaurbaum",
    ];
    return (
        <div className="flex-grow bg-bg2 flex flex-col items-center justify-start rounded-lg w-[250px]">
            {friends.map((friend) => (
                <Friend name={friend} curr={friend == current_friend} />
            ))}
        </div>
    );
}
