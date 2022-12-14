import { useState } from "react";
import { useEffect, useContext } from "react";
import SocketContext from "../context/SocketContext";
import { localServer } from "../constants/domains";
import UserContext from "../context/UserContext";
import axios from "axios";
import {
    symm_decrypt,
    hashPassword,
    symm_encrypt,
    genKeyPair,
} from "../functions/encryption";

export default function Login({ setLogin, setSucc }, props) {
    // const [socket, setSocket] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const socket = useContext(SocketContext);
    const user = useContext(UserContext);

    const submit = async (e) => {
        try {
            e.preventDefault();
        } catch {}

        const curUser = { username, password };

        let { hashword, remKey } = await hashPassword(password);

        user.setUsername(username);
        console.log(curUser);
        localStorage.setItem("username", curUser.username);

        //try to grab the id from the loginResponse and set it in the context
        const loginResponse = await axios.post(`${localServer}/users/login`, {
            username,
            hashword,
        });
        console.log(loginResponse);
        const friendResponse = await axios.post(
            `${localServer}/users/get_friends`,
            { username }
        );
        console.log(friendResponse);

        localStorage.setItem("auth-token", loginResponse.data.token);
        localStorage.setItem("id", loginResponse.data.user._id);
        localStorage.setItem("username", loginResponse.data.user.username);
        localStorage.setItem("first-name", loginResponse.data.user.firstName);
        localStorage.setItem("last-name", loginResponse.data.user.lastName);
        localStorage.setItem("email", loginResponse.data.user.email);
        localStorage.setItem("password", loginResponse.data.user.password);
        localStorage.setItem("friends", friendResponse.data);
        localStorage.setItem("blocked", loginResponse.data.blocked);

        user.setUserPuk(loginResponse.data.user.publicKey);
        let pik = loginResponse.data.user.privateKey;
        pik = await symm_decrypt(pik, remKey);
        user.setUserPik(pik);

        user.setId(loginResponse.data.user.id);

        setSucc(true);
    };

    return (
        <div className="backdrop-blur-md inset-0 h-screen absolute w-screen flex justify-center m-auto items-center">
            <div className="gap-4 p-10 bg-bg3 rounded-lg flex flex-col justify-center items-center">
                <div id="login-error"></div>
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
                    onKeyDown={(e) => e.key === "Enter" && submit()}
                    className="bg-bg2 p-2 px-3 rounded-full text-text-grey2 focus:border-transparent 
                        placeholder-text-grey focus:outline-none"
                ></input>
                <form onSubmit={submit}>
                    <button
                        className="text-xl font-bold text-white p-2 rounded-lg"
                        onClick={(e) => {
                            {
                                submit;
                            }
                        }}
                    >
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
