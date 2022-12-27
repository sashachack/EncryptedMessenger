import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useContext } from "react";
import SocketContext from "../context/SocketContext";
import UserContext from "../context/UserContext";

import axios from "axios";

function Friend({ friend, setSelectedID, curr }) {
    const socket = useContext(SocketContext);
    const user = useContext(UserContext);
    friend = friend[0];

    const c = ` ${
        curr ? "bg-soft-red text-black" : " cursor-pointer"
    } p-5 text-left rounded-lg`;
    return (
        <div
            className={c + " flex justify-start items-center w-full"}
            onClick={() => {
                setSelectedID(friend.id);
                socket.emit("join", {
                    uid: user.id,
                    ouid: friend.id,
                });
            }}
        >
            <FontAwesomeIcon icon={faUser} className="text-2xl mr-5" />
            <div>{friend.username}</div>
        </div>
    );
}

export default function Friends({ selectedID, setSelectedID, query }) {
    const socket = useContext(SocketContext);
    //use global context
    const user = useContext(UserContext);
    const [no_friends, setNoFriends] = useState(true);

    useEffect(() => {
        // console.log(user.id);
        const getFriends = async () => {
            const res = await fetch("/api/get_friends", {
                method: "POST",
                body: JSON.stringify({ id: user.id }),
            });
            const body = res.json();
            return body;
        };

        const action = async () => {
            const res = await getFriends();
            let farr = res.data;
            user.setFriends(farr);
            if (farr.length == 0) {
                setNoFriends(true);
            } else {
                setNoFriends(false);
            }
        };
        action();
    }, [user.friends]);

    const filterFriends = (friends) => {
        if (query == "" || friends.length == 0) {
            return friends;
        }
        return friends.filter((friend) => {
            return friend[0].username
                .toLowerCase()
                .includes(query.toLowerCase());
        });
    };

    return (
        <div className="flex-grow bg-bg2 flex flex-col items-center justify-start rounded-lg w-[250px]">
            {user.friends &&
                filterFriends(user.friends).map((friend) => (
                    <Friend
                        key={friend[0].id}
                        friend={friend}
                        setSelectedID={setSelectedID}
                        curr={friend[0].id == selectedID}
                    />
                ))}
            {no_friends && (
                <p className="text-center text-white p-2 rounded-lg">
                    Add friends using the button below to start chatting!
                </p>
            )}
        </div>
    );
}
