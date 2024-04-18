// import React from 'react';

interface tabProps {
  name: string;
  time: string;
  image: string;
  lastMsg: string;
}

const ChatTab = (props: tabProps) => {
  return (
    <div className="flex rounded-md pb-5">
      <img className=" rounded-full w-10 h-10 mr-2" src={props.image} />

      <div className="flex justify-between w-full">
        <div className="flex flex-col">
          <span className=" font-bold">{props.name}</span>
          {props.lastMsg ? (
            <span className="text-xs text-gray-400">{props.lastMsg}</span>
          ) : (
            <span className="text-xs text-secondary">Typing...</span>
          )}
        </div>
        <span className="text-xs text-gray-400">{props.time}</span>
      </div>
    </div>
  );
};

export default ChatTab;