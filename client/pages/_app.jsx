import "../styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import SocketContext from "../context/SocketContext";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

// use socket context

function MyApp({ Component, pageProps }) {
    return (
        <SocketContext.Provider value={socket}>
            <Component {...pageProps} />
        </SocketContext.Provider>
    );
}

export default MyApp;
