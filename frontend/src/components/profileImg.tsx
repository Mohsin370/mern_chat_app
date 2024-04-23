interface propsType {
  image: string;
}

import { useEffect } from "react";

export default function ProfileImg(props: propsType) {
  useEffect(() => {});

  const nameInitials = () => {
    let name = "Khawaja Mohsin";
    let nameArr = name.split(" ");
    let initials: string = "";

    initials = nameArr.shift()?.[0] || "" + nameArr.pop()?.[0] || "";

    console.log(initials.toUpperCase());
  };

  return (
    <div >
      {props.image?<img className="rounded-full w-10 h-10 mr-3" src={props.image} alt="user" onClick={nameInitials} />:
      <div className="flex">
        <span className="text-white bg-secondary w-10 h-10 p-2 mr-1 rounded-full">KM</span>
      </div>
      }
    </div>
  );
}
