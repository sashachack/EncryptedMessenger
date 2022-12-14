import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { friends } from "../constants/friends";
import { useContext } from "react";
import UserContext from "../context/UserContext";

function User({ user, setSelectedUserID, curr }) {
    const curUser = localStorage.getItem("username");
    if (user.username != curUser) {
        const c = ` ${
            curr ? "bg-soft-red text-black" : " cursor-pointer"
        } p-5 text-left rounded-lg`;

        return (
            <div
                className={c + " flex justify-start items-center w-full"}
                onClick={() => setSelectedUserID(user._id)}
            >
                <FontAwesomeIcon icon={faUser} className="text-2xl mr-5" />
                <div>{user.username}</div>
            </div>
        );
    }
}

export default function FriendModal(
    { friendModal, setFriendModal, selectedUserID, setSelectedUserID },
    props
) {
    const [all_users, setAllUsers] = useState([]);
    const [current_friends, setCurrentFriends] = useState([]);
    const [no_new_friends, setNoNewFriends] = useState([]);
    const [friend_options, setfriendOptions] = useState([]);
    const user = useContext(UserContext);

    useEffect(() => {
        getFriends().catch((err) => console.log(err));
        getFriendOptions().catch((err) => console.log(err));
    }, [all_users]);

    const getFriendOptions = async () => {
        let first = localStorage.getItem("first");
        let last = localStorage.getItem("last");
        let username = localStorage.getItem("username");
        const getUsers = await axios.post(
            "http://localhost:5001/users/all_users",
            { first, last }
        );
        let temp_options = [];
        for (let i = 0; i < getUsers.data.length; i++) {
            if (
                !current_friends.includes(getUsers.data[i].username) &&
                getUsers.data[i].username != username
            ) {
                temp_options.push(getUsers.data[i]);
                console.log(getUsers.data[i]);
            }
        }

        if (temp_options.length == 0) {
            setNoNewFriends(true);
        } else {
            setNoNewFriends(false);
        }
        setAllUsers(temp_options);
    };

    const getFriends = async () => {
        const username = localStorage.getItem("username");
        const current_friends = await axios.post(
            "http://localhost:5001/users/get_friends",
            { username }
        );
        let temp_friends = [];
        for (let i = 0; i < current_friends.data.length; i++) {
            current_friends.data[i]["id"] = i;
            let username = current_friends.data[i]["username"];
            temp_friends.push(username);
        }
        setCurrentFriends(temp_friends);
    };

    const submit = async (e) => {
        e.preventDefault();

        // const id = localStorage.getItem('id')

        const username = localStorage.getItem("username");
        const new_friend = await axios.post(
            "http://localhost:5001/users/find_user",
            { selectedUserID }
        );
        const ouid = new_friend.data[0].id;
        const uid = user.id;
        const friend_username = new_friend.data[0].username;
        if (current_friends.includes(friend_username)) {
            document.getElementById("friend-error").innerText =
                "You have already added this user as a friend!";
        }
        const add_friend = await axios.post(
            "http://localhost:5001/users/add_friend",
            { friend_username, uid, ouid, username }
        );
    };

    return (
        <div className="backdrop-blur-md inset-0 h-screen absolute w-screen flex justify-center m-auto items-center">
            <div className=" bg-bg3 rounded-lg flex flex-col justify-center items-center">
                <button className="text-l font-bold text-white p-2">
                    <FontAwesomeIcon
                        className="text-white cursor-pointer fa-2x"
                        icon={faTimes}
                        onClick={() => setFriendModal(false)}
                    />
                </button>
                {no_new_friends && (
                    <div className="mt-10 flex justify-center items-center flex-col w-72 rounded-lg shadow-xl h-auto p-2 text-l font-bold text-white p-2">
                        <p>No new friends to add!</p>
                        <br></br>
                        <p>Check back later to see if</p>
                        <p>more users have joined the chat.</p>
                    </div>
                )}
                {!no_new_friends && (
                    <div className="mt-10 flex justify-center items-center flex-col w-72 rounded-lg shadow-xl h-auto p-2">
                        {all_users.map((user) => (
                            <User
                                key={user._id}
                                user={user}
                                setSelectedUserID={setSelectedUserID}
                                curr={user._id == selectedUserID}
                            />
                        ))}

                        <button
                            className="text-xl font-bold text-white p-2 rounded-lg"
                            onClick={submit}
                        >
                            Add Friend
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
