import { useState } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SignUp({setLogin}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");

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
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-bg2 p-2 px-3 rounded-full text-text-grey2 focus:border-transparent 
                        placeholder-text-grey focus:outline-none"
                ></input>
                <button className="text-xl font-bold text-white p-2 rounded-lg"
                >
                    Sign Up
                </button>
        </div>
        </div>
    );
}