import Friends from "../components/friends";
import InfoPanel from "../components/info_panel";
import MainWindow from "../components/main_window";
import Search from "../components/search";
import SettingsButton from "../components/settings_button";
import Login from "../components/login";
import SignUp from "../components/sign_up";
import Popup from "../components/popup"
import { useState, useContext } from "react";
import { friends } from "../constants/friends";
import { convos } from "../constants/convos";
import {SocketContext} from '../components/context/SocketContext';
import io from "socket.io-client"

const socket = io.connect('http://localhost:4000');
export default function Home() {
    const [selectedFriendID, setSelectedFriendID] = useState(0);
    const [login, setLogin] = useState(true);
    const [success, setSucc] = useState(false);
    

    return (
        <div
            className="bg-dark1 h-screen gap-6 p-6 flex justify-between"
            // style={{
            //     gridTemplateAreas: `'a b b b b c' 'd b b b b c' 'd b b b b c' 'd b b b b c'
            //     'd b b b b c' 'd b b b b c' 'd b b b b c' 'd b b b b c' 'd b b b b c' 'd b b b b c'
            //     'd b b b b c' 'd b b b b c' 'e b b b b c' 'e b b b b c'`,
            // }}
        >
            <SocketContext.Provider value={socket}>
                <div className="flex flex-col justify-between gap-6">
                    <Search />
                    <Friends
                        friends={friends}
                        selectedID={selectedFriendID}
                        setSelectedID={setSelectedFriendID}
                    />
                    <SettingsButton />
                </div>
                <MainWindow convos={convos} selectedFriendID={selectedFriendID} socket = {socket} />
                {/* <div
                    className={`backdrop-blur-md inset-0 h-screen absolute w-screen flex justify-center m-auto items-center ${
                        login
                            ? <Login/>
                            : <SignUp/>
                    } `}
                    >
                </div> */}
                {/* {login && <Login setLogin = {setLogin}/>}
                {!login && <SignUp setLogin = {setLogin}/>} */}
                {!success && <Popup login={login} setLogin={setLogin} setSucc={setSucc} socket = {socket}/>}

                <InfoPanel />
            </SocketContext.Provider>
        </div>
    );
}
