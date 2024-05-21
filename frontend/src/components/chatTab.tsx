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

      <div className="flex w-full justify-between overflow-hidden">
        <div className="flex flex-col">
          <span className="font-bold tracking-wider">{props.name}</span>
          <span className="text-xs max-w-[250px] whitespace-nowrap overflow-hidden text-ellipsis">{props.typing ?"Typing...": props.lastMsg}</span> 
        </div>
        <span className="text-xs text-gray-400">{props.time}</span>
      </div>
    </div>
  );
};

export default ChatTab;
