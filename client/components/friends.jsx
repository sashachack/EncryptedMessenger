import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useContext } from "react";
import SocketContext from "../context/SocketContext";
import UserContext from "../context/UserContext";

import axios from "axios";

function Friend({ friend, setSelectedID, curr }) {
    const socket = useContext(SocketContext)
    const user = useContext(UserContext)
    // const c = ` ${
    //     curr ? "bg-send-blue text-black" : " hover:bg-soft-red cursor-pointer"
    // } p-5 text-left w-full rounded-lg`;
    friend = friend[0]
    console.log(friend);

    const c = ` ${ 
        curr ? "bg-soft-red text-black" : " cursor-pointer"
    } p-5 text-left rounded-lg`;
    return (
        <div
            className={c + " flex justify-start items-center w-full"}
            onClick={() => {
                
                setSelectedID(friend.id)
                socket.emit('join', {
                    uid: user.id,
                    ouid: friend.id
                })
            
            }}
        >
            <FontAwesomeIcon icon={faUser} className="text-2xl mr-5" />
            <div>{friend.username}</div>
        </div>
    );
}

export default function Friends({selectedID, setSelectedID}) {
    const socket = useContext(SocketContext)
    //use global context
    const user = useContext(UserContext);
    const [no_friends, setNoFriends] = useState(true);
    // current_friend = current_friend || "Nash Solon";
    // const friends = [
    //     "Nash Solon",
    //     "Nisha Sahgal",
    //     "Kyle Montgomery",
    //     "Carson Brown",
    //     "Michael Schlaurbaum",
    // ];

    useEffect(() => {
        console.log(user.id)
        const getFriends = async () =>{
            const res = await fetch('/api/get_friends', {
                method: "POST",
                body: JSON.stringify({id: user.id})
            })
            const body = res.json();
            console.log(body)
            return body
        }


        getFriends().then(res =>{

            console.log(res.data)
            let farr = res.data
            console.log(farr)
            user.setFriends(farr)
            if(farr.length == 0) {
                setNoFriends(true)
            }

        })
        .catch(err => console.log(err));
        
    },[user.id])

    const getFriends = async () =>{
        let username = localStorage.getItem("username")
        const friendResponse = axios.post('http://localhost:5001/users/get_friends', {username})
        console.log(friendResponse)
      }
  
    
//NISHAs
/*
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
        */
        //END NISHA's
    

    return (
        <div className="flex-grow bg-bg2 flex flex-col items-center justify-start rounded-lg w-[250px]">
            {user.friends && user.friends.map((friend) => (
                <Friend
//NASHs

                    key={friend[0].id}
                    friend={friend}
                    setSelectedID={setSelectedID}
                    curr={friend[0].id == selectedID}

//NISHA
/*
                    key={friend._id}
                    friend={friend}
                    setSelectedID={setSelectedID}
                    curr={friend._id == selectedID}
*/
//END NISHA
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
