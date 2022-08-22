import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import EditProfile from './EditProfile';

function Navbar({ keyword, updateKeyword }) {

  const navigate = useNavigate();

  const [navbarDropDown, setNavbarDropDown] = useState(false);
  const [EditProfilePage, setEditProfilePage] = useState(false);

  const [Error, setError] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState("error");

  const [Success, setSuccess] = useState(false);
  const [SuccessMsg, setSuccessMsg] = useState("success");

  const navDropDown = useRef(null);

  const signOut = () => {
    window.sessionStorage.clear();
    navigate('/');
  }

  const displayError = (errorMsg) => {
    setError(true);
    setErrorMsg(errorMsg);

    // hide the error message after 4 seconds
    setTimeout(() => {
      setError(false);
      setErrorMsg("");
    }, 4000);
  }

  const displaySucc = (SuccMsg) => {
    setSuccess(true);
    setSuccessMsg(SuccMsg);

    // hide the error message after 4 seconds
    setTimeout(() => {
      setSuccess(false);
      setSuccessMsg("");
    }, 4000);
  }

  useEffect(() => {
    document.addEventListener("click", (e) => {
      // hide the navbar DropDown menu when click out side
      if (navDropDown.current !== null && !navDropDown.current.contains(e.target)) {
        setNavbarDropDown(false);
      }
    })
  }, []);


  return (
    <nav className="nav-bar flex justify-between px-3 py-1 shadow">
      <div className={`${!Error && "hidden"} w-4/6 md:w-5/6 fixed bg-red-500 mt-2 rounded z-30`}>
        <p className="text-white font-medium text-center text-lg">{ErrorMsg}</p>
      </div>
      <div className={`${!Success && "hidden"} w-4/6 md:w-5/6 fixed bg-green-500 mt-2 rounded z-30`}>
        <p className="text-white font-medium text-center text-lg">{SuccessMsg}</p>
      </div>

      {EditProfilePage && <EditProfile displayError={displayError} displaySucc={displaySucc} closePage={setEditProfilePage} />}

      <div className='flex items-center'>
        <div className='bg-[#f8f8f8] flex items-center p-1'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{ fill: "rgba(0, 0, 0, 1)" }}>
            <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z">
            </path>
          </svg>
        </div>
        <input type="text" value={keyword} onChange={(e) => { updateKeyword(e.target.value) }} className='bg-[#f8f8f8] outline-none p-1' placeholder='Search' />
      </div>
  
      <div ref={navDropDown} onClick={() => setNavbarDropDown(true)} className='bg-main hover:bg-mainHover duration-200 my-2 mx-0.5 p-1.5 rounded cursor-pointer'>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{ fill: "rgba(255, 255, 255, 255)" }}>
            <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z">
            </path>
          </svg>
        </div>
        <div id="navbarDropDown" className={`${!navbarDropDown && "hidden"} absolute right-3 mt-4 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700`}>
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="navbarDropDownDefault">
            <button onClick={() => setEditProfilePage(true)} className="w-full py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Edit Profile
            </button>
            <button onClick={() => signOut()} className="w-full py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Sign out
            </button>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar