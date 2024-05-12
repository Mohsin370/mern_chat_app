interface propsType {
  image: string;
  name: string;
  online?: boolean;
}

import { useEffect } from "react";

export default function ProfileImg(props: propsType) {
  useEffect(() => {
    nameInitials();
  });

  const nameInitials = () => {
    if (!props.name) return;
    let name = props.name;
    let nameArr = name.split(" ");

    let initials: string = (nameArr.shift()?.[0] || "") + (nameArr.pop()?.[0] || "");
    return initials.toUpperCase();
  };

  return (
    <div>
      {props.image}
      {props.image ? (
        <img className="rounded-full w-10 h-10 mr-3" src={props.image} alt="user" onClick={nameInitials} />
      ) : (
        <div className="flex">
          <span className=" relative text-center text-white bg-secondary w-10 h-10 p-2 mr-1 rounded-full">
            {nameInitials()}
            {props.online && <div className=" bg-green-500 w-2 h-2 rounded-full absolute right-1 bottom-0.5 border  border-gray-950"></div>}
          </span>
        </div>
      )}
    </div>
  );
}
