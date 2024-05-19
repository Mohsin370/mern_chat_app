import { Link } from "react-router-dom";
import landingSVG from "../../assets/landing.png";
import Header from "../../components/header";
import { ArrowRightIcon } from "@heroicons/react/16/solid";

export default function landing() {
  return (
    <article className="pros prose-xl">
      <div className="mx-auto flex max-h-dvh w-11/12 flex-col overflow-hidden">
        <Header />
        <div className="grid-cols-2 items-center md:my-10 xl:grid">
          <div className="flex flex-col items-center justify-center xl:block">
            <h1 className="font-gilroy-bold text-primary">
              Slick Chats
              <br />
              Big laughs
            </h1>
            <p className="text-center text-primary-light md:text-left">
              Revolutionize web connections for all. Modern design, <br /> endless connections, boundless communication.
            </p>
            <Link to="/login">
              <button className="flex h-20 w-52 items-center justify-between rounded-2xl bg-violet-100">
                <span className="px-4 font-bold">Let's Ping</span>
                <div className="transform rounded-2xl bg-secondary p-7 transition-transform duration-500 ease-in-out hover:translate-x-6 ">
                  <ArrowRightIcon className=" h-6 text-white" />
                </div>
              </button>
            </Link>
          </div>
          <div className="m-auto md:w-2/3 xl:w-full">
            <img className="m-auto hidden md:block" src={landingSVG} alt="landing" />
          </div>
        </div>
      </div>
    </article>
  );
}
