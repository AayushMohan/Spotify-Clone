import { useSession } from "next-auth/react";
import React from "react";

const Center = () => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-grow text-white">
      <h1>I am center</h1>
      <header>
        <div className="">
          <img
            className="rounded-full w-190 h-10"
            src="{session?.user.image}"
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5"></ChevronDownIcon>
        </div>
      </header>
    </div>
  );
};

export default Center;
