import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Search({ query, setQuery }) {
    return (
        <div className="bg-bg2 text-text-grey flex items-center justify-start p-2 pl-3 rounded-lg">
            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className={`mr-2 ${query != "" && "text-text-grey2"}`}
            />
            <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full text-text-grey2 focus:border-transparent 
                        placeholder-text-grey focus:outline-none bg-transparent"
            />
        </div>
    );
}
