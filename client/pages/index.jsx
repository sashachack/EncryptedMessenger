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
import UserContext from "../context/UserContext";

import FriendModal from "../components/friend_modal";

export default function Home() {
    const [selectedFriendID, setSelectedFriendID] = useState(100);
    const [login, setLogin] = useState(true);
    const [success, setSucc] = useState(false);

    const [id, setId] = useState("");
    const [username, setUsername] = useState("");
    const [friends, setFriends] = useState(null);
    const [userPuk, setUserPuk] = useState(null);
    const [userPik, setUserPik] = useState(null);
    const user = {
        id,
        setId,
        username,
        setUsername,
        friends,
        setFriends,
        userPuk,
        setUserPuk,
        userPik,
        setUserPik,
    };

    const [friendModal, setFriendModal] = useState(false);

    const [query, setQuery] = useState("");

    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        password: undefined,
    });

    return (
        <div className="bg-dark1 h-screen gap-6 p-6 flex justify-between">
            <UserContext.Provider value={user}>
                <div className="flex flex-col justify-between gap-6">
                    <Search query={query} setQuery={setQuery} />

                    {success && (
                        <Friends
                            query={query}
                            friends={friends}
                            selectedID={selectedFriendID}
                            setSelectedID={setSelectedFriendID}
                        />
                    )}
                    {/* <SettingsButton /> */}
                    <AddFriend
                        friendModal={friendModal}
                        setFriendModal={setFriendModal}
                        selectedID={selectedFriendID}
                        setSelectedID={setSelectedFriendID}
                    />
                </div>
                <MainWindow
                    convos={convos}
                    selectedFriendID={selectedFriendID}
                />
                {friendModal && (
                    <FriendModal
                        friendModal={friendModal}
                        setFriendModal={setFriendModal}
                        selectedUserID={selectedFriendID}
                        setSelectedUserID={setSelectedFriendID}
                    />
                )}
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

                {!success && (
                    <Popup
                        login={login}
                        setLogin={setLogin}
                        setSucc={setSucc}
                    />
                )}

                {/* <InfoPanel /> */}
            </UserContext.Provider>
        </div>
    );
}
