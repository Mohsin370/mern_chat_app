import ProfileImg from "../../components/profileImg";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";

export default function Conversations() {
  return (
    <div className="h-full px-5">
      <div className="w-100 flex px-5">
        <ProfileImg image="" />
        <h3 className=" text-3xl font-bold">Khawaja Mohsin</h3>
      </div>
      <hr className="my-4" />

      <div className="bg-gray-50 h-full px-5 py-5 relative rounded-sm">
        <div className=" h-full overflow-y-scroll">
          <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
        </div>
        <div className="absolute bottom-10 flex w-full">
          <input className=" focus:outline-none focus:shadow-secondary px-3 w-5/6 border  border-violet-100" />
          <button className="bg-secondary text-white px-4 py-2 rounded-md ml-3">
            <PaperAirplaneIcon className="h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
