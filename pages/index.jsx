import Friends from "../components/friends";
import InfoPanel from "../components/info_panel";
import MainWindow from "../components/main_window";
import Search from "../components/search";
import SettingsButton from "../components/settings_button";
import { useState } from "react";
import { friends } from "../constants/friends";
import { convos } from "../constants/convos";

export default function Home() {
    const [selectedFriendID, setSelectedFriendID] = useState(0);
    return (
        <div
            className="bg-dark1 h-screen gap-6 p-6 flex justify-between"
            // style={{
            //     gridTemplateAreas: `'a b b b b c' 'd b b b b c' 'd b b b b c' 'd b b b b c'
            //     'd b b b b c' 'd b b b b c' 'd b b b b c' 'd b b b b c' 'd b b b b c' 'd b b b b c'
            //     'd b b b b c' 'd b b b b c' 'e b b b b c' 'e b b b b c'`,
            // }}
        >
            <div className="flex flex-col justify-between gap-6">
                <Search />
                <Friends
                    friends={friends}
                    selectedID={selectedFriendID}
                    setSelectedID={setSelectedFriendID}
                />
                <SettingsButton />
            </div>
            <MainWindow convos={convos} selectedFriendID={selectedFriendID} />
            <InfoPanel />
        </div>
    );
}
