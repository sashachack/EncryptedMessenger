import { useState, useContext } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { generateKeyPair, publicEncrypt, privateDecrypt } from "crypto";
import {
    asymm_decrypt,
    asymm_encrypt,
    genKeyPair,
    hashPassword,
    symm_encrypt,
} from "../functions/encryption";

import axios from "axios";
import UserContext from "../context/UserContext";
// const bcrypt = require("bcryptjs");
import CryptoJS from "crypto-js";

// const genKeyPair = async (e) => {
//     const keyPair = await window.crypto.subtle.generateKey(
//         {
//             name: "ECDH",
//             namedCurve: "P-256",
//         },
//         true,
//         ["deriveKey", "deriveBits"]
//     );

//     const publicKeyJwk = await window.crypto.subtle.exportKey(
//         "jwk",
//         keyPair.publicKey
//     );

//     const privateKeyJwk = await window.crypto.subtle.exportKey(
//         "jwk",
//         keyPair.privateKey
//     );

//     return { publicKeyJwk, privateKeyJwk };
// };

export default function SignUp({ setLogin, setSucc }, props) {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    // const { setUserData } = useContext(UserContext);
    // const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();

        try {
            let { puk, pik } = await genKeyPair();
            console.log(puk);
            console.log(pik);

            // TESTING
            const message = "This is a test message";
            console.log(message);
            const encrypted = await asymm_encrypt(message, puk);
            console.log(encrypted);
            const decrypted = await asymm_decrypt(encrypted, pik);
            console.log(decrypted);
            //

            const { hashword, remKey } = await hashPassword(password);
            pik = await symm_encrypt(pik, remKey);

            const newUser = {
                first,
                last,
                email,
                username,
                hashword,
                puk,
                pik,
            };
            console.log(newUser);
            //}); */

            const signUp = await axios.post(
                "http://localhost:5001/users/signup",
                newUser
            );

            console.log(signUp);

            const loginResponse = await axios.post(
                "http://localhost:5001/users/login",
                { username, hashword }
            );

            // setUserData({
            //     token: loginResponse.data.token,
            //     user: loginResponse.data.user,
            //     first: signUp.data.first,
            //     last: signUp.data.last,
            //     email: signUp.data.email,
            //     password: signUp.data.password,
            // });

            localStorage.setItem("auth-token", loginResponse.data.token);
            localStorage.setItem("first-name", signUp.data.firstName);
            localStorage.setItem("last-name", signUp.data.lastName);
            localStorage.setItem("email", signUp.data.email);
            localStorage.setItem("password", signUp.data.password);
            localStorage.setItem("username", signUp.data.username);
            localStorage.setItem("friends", loginResponse.data.friends);
            localStorage.setItem("blocked", loginResponse.data.blocked);
            // history.push("/");

            setLogin(false);
            setSucc(true);
        } catch (e) {
            // document.getElementById("signup-error").innerText = e.response.data.msg
            console.log(e);
        }
    };

    return (
        <div className="backdrop-blur-md inset-0 h-screen absolute w-screen flex justify-center m-auto items-center">
            <div className="gap-4 p-10 bg-bg3 rounded-lg flex flex-col justify-center items-center">
                <div className="h-full w-full justify-start">
                    <FontAwesomeIcon
                        className="text-white cursor-pointer"
                        icon={faArrowLeft}
                        onClick={(e) => setLogin(true)}
                    />
                </div>
                <div id="signup-error"></div>
                <input
                    type="text"
                    value={first}
                    placeholder="First Name"
                    onChange={(e) => setFirst(e.target.value)}
                    className="bg-bg2 rounded-full p-2 px-3 text-text-grey2 focus:border-transparent 
                        placeholder-text-grey focus:outline-none"
                ></input>
                <input
                    type="text"
                    value={last}
                    placeholder="Last Name"
                    onChange={(e) => setLast(e.target.value)}
                    className="bg-bg2 rounded-full p-2 px-3 text-text-grey2 focus:border-transparent 
                        placeholder-text-grey focus:outline-none"
                ></input>
                <input
                    type="text"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-bg2 rounded-full p-2 px-3 text-text-grey2 focus:border-transparent 
                        placeholder-text-grey focus:outline-none"
                ></input>
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
                        type="submit"
                        className="text-xl font-bold text-white p-2 rounded-lg"
                        onClick={submit}
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
