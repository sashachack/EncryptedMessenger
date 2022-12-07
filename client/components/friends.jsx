import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

function Friend({ friend, setSelectedID, curr }) {
    // const c = ` ${
    //     curr ? "bg-send-blue text-black" : " hover:bg-soft-red cursor-pointer"
    // } p-5 text-left w-full rounded-lg`;
    console.log(friend);
    const c = ` ${
        curr ? "bg-soft-red text-black" : " cursor-pointer"
    } p-5 text-left rounded-lg`;
    return (
        <div
            className={c + " flex justify-start items-center w-full"}
            onClick={() => setSelectedID(friend.id)}
        >
            <FontAwesomeIcon icon={faUser} className="text-2xl mr-5" />
            <div>{friend.name}</div>
        </div>
    );
}

export default function Friends({ friends, selectedID, setSelectedID }) {
    // current_friend = current_friend || "Nash Solon";
    // const friends = [
    //     "Nash Solon",
    //     "Nisha Sahgal",
    //     "Kyle Montgomery",
    //     "Carson Brown",
    //     "Michael Schlaurbaum",
    // ];
    useEffect(() => {
        getFriends().then(res =>{
            console.log(res)
        })
        .catch(err => console.log(err));
    },[])

    const getFriends = async () =>{
        const res = await fetch('http://localhost:4000/express_backend')
        const body = res.json();
        console.log(body)
        return body
    }

    return (
        <div className="flex-grow bg-bg2 flex flex-col items-center justify-start rounded-lg w-[250px]">
            {friends.map((friend) => (
                <Friend
                    key={friend.id}
                    friend={friend}
                    setSelectedID={setSelectedID}
                    curr={friend.id == selectedID}
                />
            ))}
        </div>
    );
}
