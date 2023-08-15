import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { logout } from "../store/features/authSlice";

type HeaderProps = {
  className: string;
  show: boolean;
};
const Header = ({ className, show }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);

  const handleLogout = ()=> {
    dispatch(logout(null));
  }

  const logo =
    "https://ecs7.tokopedia.net/assets-tokopedia-lite/v2/zeus/production/e5b8438b.svg";
  return (
    <div
      className={`${className} sticky sm:bg-opacity-20 lg:block hidden top-0 z-50`}
    >
      <nav className="flex items-center  justify-between flex-wrap bg-teal py-2 px-6">
        <div className="flex items-center flex-no-shrink text-white mr-6">
          <Link className="flex" to={"/"}>
            <img src={logo} alt="tokped-logo" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#369e3d"
              className="w-6 h-6 mx-2 bg-gray-100 rounded-full"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
        <div className="w-full  space-x-2 flex-grow flex items-center justify-end lg:w-auto md:w-auto xl:w-auto">
          <HoverCard>
            <HoverCardTrigger>
              <img
                className="h-10 w-10"
                src="https://1.gravatar.com/userimage/238619308/a33848382be9a5d620baf6e423e9ebd4"
                alt=""
              />
            </HoverCardTrigger>
            <HoverCardContent
              className=" z-50 mr-5 px-4 rounded-lg py-4 bg-slate-900 shadow-xl border border-slate-600
            "
            >
              <div className="w-full block space-x-2  flex-grow lg:flex lg:items-center justify-end lg:w-auto">
                {!userInfo && (
                  <>
                    <Link to={"/auth"}>
                      <Button variant={"outline"}>Login</Button>
                    </Link>
                    <Button onClick={handleLogout} variant={"primary"}>Daftar</Button>
                  </>
                )}
                {userInfo && 
                  <Button onClick={handleLogout} variant={'destructive'}>Logout</Button>
                }
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </nav>
    </div>
  );
};

export default Header;
