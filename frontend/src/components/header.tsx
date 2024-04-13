import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="font-medium">
      <nav className="">
        <div className="flex flex-wrap justify-between center items-center px-4">
          <Link to="/" className="text-5xl font-gilroy-bold cursor-pointer text-secondary p-0 m-0">Ping</Link>
          <ul className="flex flex-col mt-4 lg:flex-row lg:space-x-8 ">
            <li>
              <Link to="/login" className=" cursor-pointer">
                Login
              </Link>
            </li>
            <li>
              <Link to="/about">About us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
