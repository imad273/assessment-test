import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

function Login() {

  const navigate = useNavigate();

  useEffect(() => {
    // check if the user already login
    if (window.sessionStorage.getItem("user_id") !== null) {
      navigate('/Dashboard');
    }
  })

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const [Error, setError] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState("error");

  const [Loading, setLoading] = useState(false);

  const displayError = (errorMsg) => {
    setError(true);
    setErrorMsg(errorMsg);

    // hide the error message after 5 seconds
    setTimeout(() => {
      setError(false);
      setErrorMsg("");
    }, 5000);
  }

  const submitRequest = async () => {
    setLoading(true);

    // Check if the form is empty
    if (Email === "" || Password === "") {
      displayError("please complete the form");
      setLoading(false);
    } else {
      const request = await fetch('https://test-api-9kapg.qafilaty.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation AUTHENTICATE_USER {
              authenticateUser(
                content: {
                  email: "${Email}"
                  password: "${Password}"
                }
              ) {
                user {
                  id
                }
              }
            }
          `
        })
      })

      const response = await request.json()

      if (response.errors) {
        displayError(response.errors[0].message);
      } else {
        window.sessionStorage.setItem("user_id", response.data.authenticateUser.user.id);
        navigate('/Dashboard');
      }

      setLoading(false);
    }
  }

  return (
    <div className='font-tajwel text-mainText flex justify-center items-center min-h-screen'>
      <div className={`${!Error && "hidden"} w-11/12 sm:w-8/12 fixed top-0 bg-red-500 px-2 mt-2 rounded`}>
        <p className="text-white font-medium text-center text-lg">{ErrorMsg}</p>
      </div>
      <div className='lg:w-4/12 md:w-5/12 sm:w-6/12 flex flex-col bg-[#f9f9f9] px-3 py-2 shadow-md'>
        <div>
          <h3 className='text-5xl font-medium pb-2'>Login</h3>
          <p className='text-secText text-sm font-medium mt-0.5'>Enter your information to access your account</p>
        </div>
        <form className='flex flex-col pt-3 pb-2' onSubmit={(e) => e.preventDefault()}>
          <div className='my-1 flex flex-col'>
            <label htmlFor="email" className='pb-1 text-lg'>Email address</label>
            <input type="email" value={Email} onChange={(e) => setEmail(e.target.value)} name='email' placeholder='name@mail.com' className='outline-none p-1 border border-[#F3F3F3] rounded' />
          </div>
          <div className='my-1 flex flex-col'>
            <label htmlFor="password" className='pb-1 text-lg'>Password</label>
            <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} name='password' placeholder='password' className='outline-none p-1 border border-[#F3F3F3] rounded' />
          </div>
          <div className='my'>
            <p className='text-sm text-secText font-medium'>
              don't have an account? <Link to='/Signup' className='text-main hover:text-mainHover duration-200'>Signup</Link>
            </p>
          </div>
          <div className='mt-3 mb-2'>
            <button onClick={() => submitRequest()} className='py-1.5 w-full bg-main hover:bg-mainHover duration-200 rounded text-white'>{Loading ? "Wait" : "Login"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login