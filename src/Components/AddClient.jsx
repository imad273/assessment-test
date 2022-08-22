import React from 'react';
import { useState } from 'react';
import cities from "../algeria-cities.json"

function AddClient({ displayError, displaySucc, closePage, getAllClientsData }) {

  const [Email, setEmail] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Phone, setPhone] = useState("");
  const [City, setCity] = useState("");
  const [Address, setAddress] = useState("");

  const [Loading, setLoading] = useState(false);

  const CreateUser = async () => {
    setLoading(true);

    // Check if the form is empty
    if (Email === "" || FirstName === "" || LastName === "" || Phone === "" || City === "" || Address === "") {
      displayError("please complete the form");
      setLoading(false);
    } else {
      const request = await fetch('https://test-api-9kapg.qafilaty.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation CREATE_USER {
              createClient (
                content: {
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
        displaySucc("Client created successfully")
        closePage(false);
        getAllClientsData();
      }

      setLoading(false);
    }
  }

  return (
    <div className='fixed top-0 left-0 min-h-screen w-full flex justify-center items-center bg-white/50 backdrop-blur-sm rounded z-20'>
      <div className='bg-white shadow p-2'>
        <div className='flex justify-between items-center'>
          <h3 className='text-2xl md:text-3xl font-medium'>Add new Client</h3>
          <div className='cursor-pointer' onClick={() => { closePage(false) }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{ fill: "rgb(170,176,183)" }}>
              <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
            </svg>
          </div>
        </div>
        <form className='flex flex-col py-2' onSubmit={(e) => e.preventDefault()}>
          <div className='my-0.5 flex flex-col'>
            <label htmlFor="email" className='pb-0.5 md:text-lg font-medium'>Email address</label>
            <input type="email" value={Email} onChange={(e) => setEmail(e.target.value)} name='email' placeholder='name@mail.com' className='outline-none p-1 border border-[#F3F3F3] rounded' />
          </div>
          <div className="grid grid-cols-2 my-0.5 gap-x-2">
            <div className='flex flex-col'>
              <label htmlFor="first_name" className='pb-0.5 md:text-lg font-medium'>First name</label>
              <input type="text" value={FirstName} onChange={(e) => setFirstName(e.target.value)} name='first_name' placeholder='ex. Cedric' className='outline-none p-1 border border-[#F3F3F3] rounded' />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="last_name" className='pb-0.5 md:text-lg font-medium'>Last Name</label>
              <input type="text" value={LastName} onChange={(e) => setLastName(e.target.value)} name='last_name' placeholder='ex. Fuller' className='outline-none p-1 border border-[#F3F3F3] rounded' />
            </div>
          </div>
          <div className='my-0.5 flex flex-col'>
            <label htmlFor="phone" className='pb-0.5 md:text-lg font-medium'>Phone</label>
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
            <label htmlFor="address" className='pb-0.5 md:text-lg font-medium'>Address</label>
            <input type="text" value={Address} onChange={(e) => setAddress(e.target.value)} name='phone' placeholder='libery .st' className='outline-none p-1 border border-[#F3F3F3] rounded' />
          </div>

          <div className='mt-3 mb-2'>
            <button onClick={() => CreateUser()} className='py-1.5 w-full bg-main hover:bg-mainHover duration-200 rounded text-white'>{Loading ? "Wait" : "Add"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddClient