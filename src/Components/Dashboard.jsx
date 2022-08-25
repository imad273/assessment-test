import React from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import UsersList from './UsersList';
import ClientsList from './ClientsList';

function Dashboard() {

  const navigate = useNavigate();

  const [SearchKeyword, setSearchKeyword] = useState("");

  // Pages
  const [UsersPage, setUsersPage] = useState(true);
  const [ClientPage, setClientPage] = useState(false);

  useEffect(() => {
    // check if the user already login
    if (window.sessionStorage.getItem("user_id") === null) {
      navigate('/');
    }

    // to avoid the console warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='flex w-full'>
      <div className="side-bar w-14 fixed min-h-screen p-2 shadow">
        <div className='relative top-8'>
          <div className='bg-[#F0F0F0] hover:bg-[#E8E8E8] duration-200 my-2.5 mx-0.5 p-1.5 shadow rounded cursor-pointer' onClick={() => { setUsersPage(true); setClientPage(false) }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{ fill: "rgba(50, 50, 50)" }}>
              <path d="M5 22h14a2 2 0 0 0 2-2v-9a1 1 0 0 0-.29-.71l-8-8a1 1 0 0 0-1.41 0l-8 8A1 1 0 0 0 3 11v9a2 2 0 0 0 2 2zm5-2v-5h4v5zm-5-8.59 7-7 7 7V20h-3v-5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v5H5z"></path>
            </svg>
          </div>
          <div className='bg-[#F0F0F0] hover:bg-[#E8E8E8] duration-200 my-2.5 mx-0.5 p-1.5 shadow rounded cursor-pointer' onClick={() => { setUsersPage(false); setClientPage(true) }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{ fill: "rgba(50, 50, 50)" }}>
              <path d="M15 11h7v2h-7zm1 4h6v2h-6zm-2-8h8v2h-8zM4 19h10v-1c0-2.757-2.243-5-5-5H7c-2.757 0-5 2.243-5 5v1h2zm4-7c1.995 0 3.5-1.505 3.5-3.5S9.995 5 8 5 4.5 6.505 4.5 8.5 6.005 12 8 12z">
              </path>
            </svg>
          </div>
        </div>
      </div>

      <div className="content w-full ml-14">
        <Navbar keyword={SearchKeyword} updateKeyword={setSearchKeyword} />
        <div className='bg-[#f8f8f8] min-h-screen p-2'>
          {UsersPage && <UsersList keyword={SearchKeyword} />}
          {ClientPage && <ClientsList keyword={SearchKeyword} updateKeyword={setSearchKeyword} />}
        </div>
      </div>
    </div>
  )
}

export default Dashboard