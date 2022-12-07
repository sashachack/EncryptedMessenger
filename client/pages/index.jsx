import Friends from "../components/friends";
import InfoPanel from "../components/info_panel";
import MainWindow from "../components/main_window";
import Search from "../components/search";
import SettingsButton from "../components/settings_button";
import Login from "../components/login";
import SignUp from "../components/sign_up";
import Popup from "../components/popup";
import { useState, useContext } from "react";
import { friends } from "../constants/friends";
import { convos } from "../constants/convos";
import AddFriend from "../components/add_friend";
import AddFriendPopup from "../components/add_friend_popup";
import UserContext from "../context/UserContext";

export default function Home() {
    const [selectedFriendID, setSelectedFriendID] = useState(100);
    const [login, setLogin] = useState(true);
    const [success, setSucc] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [friends, setFriends] = useState(null);
    const user = {id, setId, username, setUsername, friends, setFriends} 

    return (
        <div className="bg-dark1 h-screen gap-6 p-6 flex justify-between">
            <UserContext.Provider value={user}>
                
            <div className="flex flex-col justify-between gap-6">
                <Search />
                
                <Friends
                    friends={friends}
                    selectedID={selectedFriendID}
                    setSelectedID={setSelectedFriendID}
                />
                {/* <SettingsButton /> */}

                <AddFriend setShowAdd = {setShowAdd}/>
                {showAdd && <AddFriendPopup setShowAdd = {setShowAdd}/>}
            </div>
            <MainWindow convos={convos} selectedFriendID={selectedFriendID} />
            {!success && (
                <Popup login={login} setLogin={setLogin} setSucc={setSucc} />
            )}

            <InfoPanel />
            </UserContext.Provider>
        </div>
    );
}
