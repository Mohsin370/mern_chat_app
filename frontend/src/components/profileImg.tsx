interface propsType {
  image: string;
}

import placeHolderImg from "../assets/placeholder.png";

export default function ProfileImg(props: propsType) {
  return <img className=" rounded-full w-10 h-10 mr-2" src={props.image?props.image:placeHolderImg} alt="user" />;
}
