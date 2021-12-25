import { useSession } from "next-auth/react";
import React from "react";

const Center = () => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-grow text-white">
      <h1>I am center</h1>
      <header>
        <div>
          <img src="{session.user.image}" alt=""></img>
        </div>
      </header>
    </div>
  );
};

export default Center;
