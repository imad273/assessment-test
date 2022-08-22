import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import cities from "../../algeria-cities.json"

function Signup() {

  const navigate = useNavigate();

  useEffect(() => {
    // check if the user already login
    if (window.sessionStorage.getItem("user_id") !== null) {
      navigate('/Dashboard');
      console.log("reg");
    }
  })

  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Phone, setPhone] = useState("");
  const [City, setCity] = useState("");
  const [Address, setAddress] = useState("");

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
    if (UserName === "" || Email === "" || Password === "" || FirstName === "" || LastName === "" || Phone === "" || City === "" || Address === "") {
      displayError("please complete the form");
      setLoading(false);
    } else {
      const request = await fetch('https://test-api-9kapg.qafilaty.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation CREATE_USER {
              createUser(
                content: {
                  user_name: "${UserName}"
                  password: "${Password}"
                  person: {
                    first_name: "${FirstName}"
                    last_name: "${LastName}"
                    email: "${Email}"
                    phone01: "${Phone}"
                    city: "${City}"
                    address: "${Address}"
                  }
                }
              ) {
                token
                user {
                  id
                  user_name
                  person {
                    id
                  }
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
        window.sessionStorage.setItem("user_id", response.data.createUser.user.id);
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
      <div className='my-6 lg:w-4/12 md:w-5/12 sm:w-6/12 flex flex-col bg-[#f9f9f9] px-3 py-2 shadow-md'>
        <div>
          <h3 className='text-5xl font-medium pb-2'>Signup</h3>
          <p className='text-secText text-sm font-medium mt-0.5'>Enter your information to create an account</p>
        </div>
        <form className='flex flex-col py-2' onSubmit={(e) => e.preventDefault()}>
          <div className='my-0.5 flex flex-col'>
            <label htmlFor="username" className='pb-0.5 text-lg font-medium'>User Name</label>
            <input type="text" value={UserName} onChange={(e) => setUserName(e.target.value)} name='username' placeholder='username' className='outline-none p-1 border border-[#F3F3F3] rounded' />
          </div>
          <div className='my-0.5 flex flex-col'>
            <label htmlFor="email" className='pb-0.5 text-lg font-medium'>Email address</label>
            <input type="email" value={Email} onChange={(e) => setEmail(e.target.value)} name='email' placeholder='name@mail.com' className='outline-none p-1 border border-[#F3F3F3] rounded' />
          </div>
          <div className='my-0.5 flex flex-col'>
            <label htmlFor="password" className='pb-0.5 text-lg font-medium'>Password</label>
            <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} name='password' placeholder='password' className='outline-none p-1 border border-[#F3F3F3] rounded' />
          </div>
          <div className="grid grid-cols-2 my-0.5 gap-x-2">
            <div className='flex flex-col'>
              <label htmlFor="first_name" className='pb-0.5 text-lg font-medium'>First name</label>
              <input type="text" value={FirstName} onChange={(e) => setFirstName(e.target.value)} name='first_name' placeholder='ex. Cedric' className='outline-none p-1 border border-[#F3F3F3] rounded' />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="last_name" className='pb-0.5 text-lg font-medium'>Last Name</label>
              <input type="text" value={LastName} onChange={(e) => setLastName(e.target.value)} name='last_name' placeholder='ex. Fuller' className='outline-none p-1 border border-[#F3F3F3] rounded' />
            </div>
          </div>
          <div className='my-0.5 flex flex-col'>
            <label htmlFor="phone" className='pb-0.5 text-lg font-medium'>Phone</label>
            <input type="text" value={Phone} onChange={(e) => setPhone(e.target.value)} name='phone' placeholder='309-826-5465' className='outline-none p-1 border border-[#F3F3F3] rounded' />
          </div>
          <div className='my-0.5 flex flex-col'>
            <label htmlFor="city" className='pb-0.5 text-lg font-medium'>City</label>
            <select name="city" className="outline-none p-1 border border-[#F3F3F3] rounded" onChange={(e) => { setCity(e.target.value); }}>
              <option value={""} >Choose a city</option>
              {cities.map((city, key) => {
                return (
                  <option key={key} value={city}>{city}</option>
                )
              })}
            </select>
          </div>
          <div className='my-0.5 flex flex-col'>
            <label htmlFor="address" className='pb-0.5 text-lg font-medium'>Address</label>
            <input type="text" value={Address} onChange={(e) => setAddress(e.target.value)} name='phone' placeholder='754 Wetzel Lane' className='outline-none p-1 border border-[#F3F3F3] rounded' />
          </div>
          <div className='my'>
            <p className='text-sm text-secText font-medium'>
              Already have an account? <Link to='/' className='text-main hover:text-mainHover duration-200'>Login</Link>
            </p>
          </div>
          <div className='mt-3 mb-2'>
            <button onClick={() => submitRequest()} className='py-1.5 w-full bg-main hover:bg-mainHover duration-200 rounded text-white'>{Loading ? "Wait" : "Signup"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup