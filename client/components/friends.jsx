import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import axios from "axios";

function Friend({ friend, setSelectedID, curr }) {
    // const c = ` ${
    //     curr ? "bg-send-blue text-black" : " hover:bg-soft-red cursor-pointer"
    // } p-5 text-left w-full rounded-lg`;
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

export default function Friends({selectedID, setSelectedID }, props) {
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
            console.log("called function")
        })
        .catch(err => console.log(err));
    },[])

    const getFriends = async () =>{
        let username = localStorage.getItem("username")
        const friendResponse = axios.post('http://localhost:5001/users/get_friends', {username})
        console.log(friendResponse)
    }

    let username = localStorage.getItem("username")
    let friends = []
    const friendResponse = axios.post('http://localhost:5001/users/get_friends', {username})
    friendResponse.then(function(results) {
        console.log(results)
        friends = results.data
    })

    let no_friends = false
    if(friends.length == 0) {
        no_friends = true
    }
    // console.log(friendResponse)
    // let friends = localStorage.getItem("friends");
    console.log(friends)

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
            {no_friends && (
                <p className="bg-soft-red text-white p-2 rounded-lg">
                Add friends using the button below to start chatting!
                </p>
            )}
            
        </div>
    );
}
