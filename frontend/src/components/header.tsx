import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header>
      <nav>
        <div className="flex flex-wrap items-center justify-between px-4">
          <Link to="/" className="m-auto mb-16 mt-10 cursor-pointer font-gilroy-bold text-5xl text-secondary md:m-0">
            Ping
          </Link>
          <ul className=" mt-4 hidden flex-col md:flex md:flex-row md:space-x-8 ">
            <li>
              <Link to="/login" className=" cursor-pointer">
                Login
              </Link>
            </li>
            <li>
              <Link target="blank" to="https://github.com/Mohsin370">
                Contact Me
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
