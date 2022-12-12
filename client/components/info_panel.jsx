import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Switch from "./switch";
import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function InfoPanel() {
    const user = useContext(UserContext);

    return (
        <div
            className="bg-bg2 flex flex-col items-center justify-start p-6 
        rounded-lg c w-[250px] text-center gap-4"
        >
            <FontAwesomeIcon icon={faUser} className="text-4xl" />
            <p className="text-xl font-bold">{user.username}</p>
            <button className="bg-soft-red text-white p-2 rounded-lg">
                Block User
            </button>
            {/* <Switch label="Save Messages" on={saveOn} setOn={setSaveOn} /> */}
        </div>
    );
}
