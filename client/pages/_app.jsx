import "../styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import useState, { useEffect } from "react";
import SocketContext from "../context/SocketContext";
import io from "socket.io-client";


const socket = io.connect("http://localhost:4000");

// use socket context

function MyApp({ Component, pageProps }) {

    
    // const [id, setId] = useState('');
    // const [username, setUsername] = useState('');
    // const global = {id, setId, username, setUsername}
    return (
        // wrap the app in the global context
   
        <SocketContext.Provider value={socket}>
            <Component {...pageProps} />
        </SocketContext.Provider>
    );
}

export default MyApp;
