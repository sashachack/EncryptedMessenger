import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function User({ user, setSelectedID, curr }) {
  console.log("in friend function")
  const c = ` ${
      curr ? "bg-soft-red text-black" : " cursor-pointer"
  } p-5 text-left rounded-lg`;
  return (
      <div
          className={c + " flex justify-start items-center w-full"}
          onClick={() => setSelectedID(user._id)}
      >
          <FontAwesomeIcon icon={faUser} className="text-2xl mr-5" />
          <div>{user.username}</div>
      </div>
  );
}

export default function AddFriend({friendModal, setFriendModal}) {

  console.log("in modal")
  let first = localStorage.getItem("first")
  let last = localStorage.getItem("last")
  let all_users = []
  const getUsers = axios.post('http://localhost:5001/users/all_users', {first, last})
  getUsers.then(function(results) {
      console.log(results.data)
      let curUser = localStorage.getItem("username")
      console.log(curUser)
      for(let i = 0; i < results.data.length; i++) {
        if (results.data[i].username != curUser) {
          all_users.push(results.data[i])
        }
      }
      console.log(all_users)
  })
  all_users = {"name": "Nisha", "id": 0}
  console.log(all_users)
  return (
    <div className="backdrop-blur-md inset-0 h-screen absolute w-screen flex justify-center m-auto items-center">
      <div className="gap-4 p-10 bg-bg3 rounded-lg flex flex-col justify-center items-center">
        <div className="mt-10 flex justify-center items-center flex-col w-72 rounded-lg shadow-xl h-auto p-2">
          {all_users.map((user) => (
                <User
                    key={user._id}
                    friend={user}
                    setSelectedID={setSelectedID}
                    curr={user._id == selectedID}
                />
            ))}
          <button
            className="text-xl font-bold text-white p-2 rounded-lg"
            onClick={() => setFriendModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// export default FriendModal;