import { useState } from "react";
import { useEffect, useContext } from 'react'
import io from 'socket.io-client';

// import {SignUp} from "./sign_up";

export default function Login({setLogin, setSucc, socket}) {
    // const [socket, setSocket] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
        <div className = "backdrop-blur-md inset-0 h-screen absolute w-screen flex justify-center m-auto items-center">
        <div className="gap-4 p-10 bg-bg3 rounded-lg flex flex-col justify-center items-center">
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
                onClick={(e) => {
                    setSucc(true)
                    socket.emit('send_name', {name: email});
                    
                    
                    }}>
                    Login
                </button>
                <p className="font text-text-grey2">
                    Or
                </p>
                <button className="text-xl font-bold text-white p-2 rounded-lg"
                onClick={(e)=> {
                        setLogin(false)

                        
                    
                    
                    }}>
                    Sign Up
                </button>
        </div>
        </div>
    );
}