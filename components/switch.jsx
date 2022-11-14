import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";

export default function Switch({ label, on, setOn }) {
    const icon = on ? faToggleOn : faToggleOff;
    return (
        <div className="flex items-center justify-center gap-2">
            <FontAwesomeIcon
                icon={icon}
                className={`text-2xl cursor-pointer ${
                    on ? "text-send-blue" : "text-text-grey2"
                }`}
                onClick={() => setOn(!on)}
            />
            <p>{label}</p>
        </div>
    );
}
