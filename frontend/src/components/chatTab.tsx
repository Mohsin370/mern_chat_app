// import React from 'react';

import ProfileImg from "./profileImg";

interface tabProps {
  name: string;
  time: string;
  image: string;
  lastMsg: string;
  typing: string;
}

const ChatTab = (props: tabProps) => {
  return (
    <div className="flex rounded-md pb-5">
      <ProfileImg image={props.image} name={props.name} />

      <div className="flex justify-between w-full">
        <div className="flex flex-col">
          <span className=" font-bold">{props.name}</span>
          {props.lastMsg ? (
            <span className="text-xs text-gray-400">{props.lastMsg}</span>
          ) : (
            <span className="text-xs text-secondary">{props.typing}</span>
          )}
        </div>
        <span className="text-xs text-gray-400">{props.time}</span>
      </div>
    </div>
  );
};

export default ChatTab;
