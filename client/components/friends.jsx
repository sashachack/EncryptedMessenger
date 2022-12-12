import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import React, { useState } from "react";
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
            onClick={() => setSelectedID(friend._id)}
        >
            <FontAwesomeIcon icon={faUser} className="text-2xl mr-5" />
            <div>{friend.username}</div>
        </div>
    );
}

export default function Friends({ selectedID, setSelectedID}, props) {
    const [friends, setFriends] = useState([]);
    const [no_friends, setNoFriends] = useState("");

    useEffect(() => {
        getFriends()
        .catch(err => console.log(err));
      },[])
    
      const getFriends = async () =>{
        let username = localStorage.getItem("username")
        const friendResponse = await axios.post('http://localhost:5001/users/get_friends', {username})
        let temp_friends = []
        for(let i = 0; i < friendResponse.data.length; i++) {
            temp_friends.push(friendResponse.data[i])
        }
        setFriends(temp_friends)

        if(temp_friends.length == 0) {
            setNoFriends(true)
        }
        else{
            setNoFriends(false)
        }
        return temp_friends
    }

    return (
        <div className="flex-grow bg-bg2 flex flex-col items-center justify-start rounded-lg w-[250px]">
            {friends.map((friend) => (
                <Friend
                    key={friend._id}
                    friend={friend}
                    setSelectedID={setSelectedID}
                    curr={friend._id == selectedID}
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
