import { useState, useContext } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import UserContext from "../context/UserContext";

export default function SignUp({ setLogin, setSucc }, props) {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    // const {setUserData} = useContext(UserContext);

    const submit = async (e) => { 
        e.preventDefault();
        const newUser = {first, last, email, username, password};
        console.log(newUser)

        try {
            const signUp = await axios.post("http://localhost:5001/users/signup", newUser)
            const loginResponse = await axios.post("http://localhost:5001/users/login", {username, password});
            console.log(loginResponse)

            // setUserData({ 
            //     token: loginResponse.data.token,
            //     user: loginResponse.data.user,
            //     first: signUp.data.first,
            //     last: signUp.data.last,
            //     email: signUp.data.email,
            //     password: signUp.data.password
            // });
    
            localStorage.setItem("auth-token", loginResponse.data.token);
            localStorage.setItem("first-name", signUp.data.firstName);
            localStorage.setItem("last-name", signUp.data.lastName);
            localStorage.setItem("email-", signUp.data.email);
            localStorage.setItem("password-", signUp.data.password);
            localStorage.setItem("username", signUp.data.username);
    
            console.log("done")
            setLogin(false);

        } catch (e){
            console.log(e)
        }
    }

    return (
        <div className = "backdrop-blur-md inset-0 h-screen absolute w-screen flex justify-center m-auto items-center">
        <div className="gap-4 p-10 bg-bg3 rounded-lg flex flex-col justify-center items-center">
        <div className = "h-full w-full justify-start">
            <FontAwesomeIcon className="text-white cursor-pointer" icon={faArrowLeft}
            onClick = {(e) => setLogin(true)}/>    
        </div>
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
                <button type='submit' className="text-xl font-bold text-white p-2 rounded-lg" onClick={(e) => {
                        setSucc(true);
                    }}>
                    Sign Up
                </button>
                </form>
        </div>
        </div>
    );
}