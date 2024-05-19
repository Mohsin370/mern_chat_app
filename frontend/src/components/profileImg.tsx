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

    const name = props.name.split(" ");
    return ((name.shift()?.[0] || "") + (name.pop()?.[0] || "")).toUpperCase();
  };

  return (
    <div>
      {props.image}
      {props.image ? (
        <img className="mr-3 h-10 w-10 rounded-full" src={props.image} alt="user" onClick={nameInitials} />
      ) : (
        <div className="flex">
          <span className=" relative mr-1 h-10 w-10 rounded-full bg-secondary p-2 text-center text-white">
            {nameInitials()}
            {props.online && <div className=" absolute bottom-0.5 right-1 h-2 w-2 rounded-full border border-white bg-green-500"></div>}
          </span>
        </div>
      )}
    </div>
  );
}
