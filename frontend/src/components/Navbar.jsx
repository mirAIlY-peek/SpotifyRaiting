import React, { useEffect, useState } from "react";



import {
  FaAngleLeft,
  FaAngleRight,
  FaExternalLinkAlt,
  FaUser,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

// import { useGlobalContext } from "../states/Contet";
import { logOutUser } from "../states/Actors/UserActor";

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.account);

  const location = useLocation();

  const [showDropDown, setShowDropDown] = useState(false);
  const navigate = useNavigate()
  const dispatch  = useDispatch()
  const logoutUser = () => {

      localStorage.removeItem('token')
      navigate('/login')
      dispatch(logOutUser())
  }
  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);
  return (
    <header className="flex sticky top-0 z-50 justify-between ml-2 rounded-[6px]  mt-2 p-4 secondary_bg items-center ">
      <div className="flex gap-2 items-center  w-1/2">
        <FaAngleLeft className="bg-white/10 text-3xl p-1  rounded-[50%] " />
        <FaAngleRight className="bg-white/10 text-3xl p-1  rounded-[50%] " />

      </div>

      <div>
        {!isAuthenticated ? (
          <div>
            <Link
              to={"/signup"}
              className="rounded-full  mt-4 px-8 text-base  py-2 text-white- font-semibold"
            >
              Sign Up
            </Link>

            <Link
              to={"/login"}
              className="rounded-full text-black mt-4 px-8 text-base  py-3 bg-green-400 font-semibold"
            >
              Log in
            </Link>
          </div>
        ) : (
          <div className="relative ">
            <button onClick={() => setShowDropDown(!showDropDown)}>
              <FaUser />
            </button>
            {showDropDown && (
              <div className="absolute dropdown bg-[#282828] top-8 text-sm right-0 w-[12rem]">
                <ul className="p-1">
                  <li className="">
                    <Link
                      className="flex p-2 justify-between hover:bg-white/10"
                      to={"/account"}
                    >
                      <span>Account</span> <FaExternalLinkAlt />
                    </Link>{" "}
                  </li>
                  <li className="">
                    <Link
                      className="flex p-2 justify-between hover:bg-white/10"
                      to={"/account"}
                    >
                      <span>Profile</span>{" "}
                    </Link>{" "}
                  </li>
                  <li className="">
                    <Link
                      className="flex p-2 justify-between hover:bg-white/10"
                      to={"/account"}
                    >
                      <span>Upgrade to Premium</span> <FaExternalLinkAlt />
                    </Link>{" "}
                  </li>
                  <li className="">
                    <Link
                      className="flex p-2 justify-between hover:bg-white/10"
                      to={"/account"}
                    >
                      <span>Settings</span>
                    </Link>{" "}
                  </li>
                  <li className="">
                    <button
                      onClick={logoutUser}
                      className="p-2 w-full text-left border-t border-white/10  hover:bg-white/10"
                    >
                      <span>Log out</span>
                    </button>{" "}
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
