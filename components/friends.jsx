function Friend({ name }) {
    return (
        <div className="cursor-pointer hover:bg-soft-red p-5 text-left w-full rounded-lg">
            {name}
        </div>
    );
}

export default function Friends() {
    const friends = ["Nash Solon", "Nisha Sahgal"];
    return (
        <div className="flex-grow bg-bg2 flex flex-col items-center justify-start rounded-lg w-[250px]">
            {friends.map((friend) => (
                <Friend name={friend} />
            ))}
        </div>
    );
}
