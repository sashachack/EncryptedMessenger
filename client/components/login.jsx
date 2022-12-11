import { useState } from "react";
import { useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import SocketContext from "../context/SocketContext";
import UserContext from "../context/UserContext";
import axios from "axios";
// import { friends } from "../constants/friends";

// import {SignUp} from "./sign_up";

export default function Login({ setLogin, setSucc }, props) {
    // const [socket, setSocket] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const history = useNavigate();

    const socket = useContext(SocketContext);

    const {setUserData} = useContext(UserContext);

    const submit = async (e) => {
        e.preventDefault();
        const curUser = {username, password};
        console.log(curUser)
        localStorage.setItem('username', curUser.username);
        try {
            const loginResponse = await axios.post("http://localhost:5001/users/login", {username, password})
            console.log(loginResponse);
            const friendResponse = await axios.post('http://localhost:5001/users/get_friends', {username})
            console.log(friendResponse)
            // let friends = {}
            // for(let i = 0; i < friendResponse.data.length; i++) {
            //     cur_friend = {}
            //     let friend = ""
            //     for(let j = 0; j < Object.keys(friendResponse.data[i]).length; j++) {
            //         friend += friendResponse.data[i][j]
            //     }
            //     friends["name"] = friend
            //     friends["id"] = i
            // }

            // console.log(JSON.stringify(friends))
            // setUserData({ 
            //     token: loginResponse.data.token,
            //     user: loginResponse.data.user,
            //     firstName: loginResponse.data.user.firstName,
            //     lastName: loginResponse.data.user.lastName,
            //     email: loginResponse.data.user.email,
            //     password: loginResponse.data.user.password
                
            // });
        
            localStorage.setItem("auth-token", loginResponse.data.token);
            localStorage.setItem("username", loginResponse.data.user.username);
            localStorage.setItem("first-name", loginResponse.data.user.firstName);
            localStorage.setItem("last-name", loginResponse.data.user.lastName);
            localStorage.setItem("email", loginResponse.data.user.email);
            localStorage.setItem("password", loginResponse.data.user.password);
            localStorage.setItem("friends", friendResponse.data);
            localStorage.setItem("blocked", loginResponse.data.blocked);
            // history.push("/");

            setSucc(true);
            socket.emit("send_name", { name: username });
        } catch(e) {
            document.getElementById("login-error").innerText = e.response.data.msg
        }
        
    };

    // useEffect(() => {
    //     fetch('/api/socket').finally(async () => {
    //       const newSocket = await io();
    //       setSocket(newSocket);

    //       socket.on('a user connected', () => {

    //             console.log('connected. Logging from front');
    //       })

    //       socket.on('disconnect', () => {
    //         console.log('disconnect');
    //       })

    //       return () => newSocket.close() ;

    //     })

    //   }, [setSocket])

    return (
        <div className="backdrop-blur-md inset-0 h-screen absolute w-screen flex justify-center m-auto items-center">
            <div className="gap-4 p-10 bg-bg3 rounded-lg flex flex-col justify-center items-center">
                <div id="login-error">

                </div>
                <input
                    type="text"
                    value={username}
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-bg2 rounded-full p-2 px-3 text-text-grey2 focus:border-transparent 
                        placeholder-text-grey focus:outline-none"
                ></input>
                <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-bg2 p-2 px-3 rounded-full text-text-grey2 focus:border-transparent 
                        placeholder-text-grey focus:outline-none"
                ></input>
                <form onSubmit={submit}>
                    <button
                        className="text-xl font-bold text-white p-2 rounded-lg"
                        onClick={(e) => { {submit} }}>
                        Login
                    </button>
                </form>
                <p className="font text-text-grey2">Or</p>
                <button
                    className="text-xl font-bold text-white p-2 rounded-lg"
                    onClick={(e) => {
                        setLogin(false);
                    }}
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
}
