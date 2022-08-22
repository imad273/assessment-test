import React from 'react';
import { useEffect, useState } from 'react';
import cities from "../algeria-cities.json"

function EditUser({ displayError, displaySucc, getAllUsersData, closePage, person_id }) {

  const [PersonID, setPersonID] = useState(0);
  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Phone, setPhone] = useState("");
  const [City, setCity] = useState("");
  const [Address, setAddress] = useState("");

  const [Loading, setLoading] = useState(false);

  const getProfileData = async () => {

    const request = await fetch('https://test-api-9kapg.qafilaty.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          {
            user(id: "${person_id}") {
              user_name
              person {
                id
                first_name
                last_name
                email
                phone01
                city
                address
              }
            }
          }
          `
      })
    })

    const response = await request.json()

    setPersonID(response.data.user.person.id);
    setUserName(response.data.user.user_name);
    setEmail(response.data.user.person.email);
    setFirstName(response.data.user.person.first_name);
    setLastName(response.data.user.person.last_name);
    setCity(response.data.user.person.city);
    setAddress(response.data.user.person.address);
    setPhone(response.data.user.person.phone01);
  }

  const updateProfile = async () => {
    setLoading(true);

    // Check if the form is empty
    if (UserName === "" || Email === "" || FirstName === "" || LastName === "" || Phone === "" || City === "" || Address === "") {
      displayError("please complete the form");
      setLoading(false);
    } else {

      const request = await fetch('https://test-api-9kapg.qafilaty.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation UPDATE_USER {
              updateUser(
                id_person: "${PersonID}"
                content: {
                  user_name: "${UserName}"
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
                status
              }
            }
          `
        })
      })

      const response = await request.json()

      if (response.data.updateUser.status === false) {
        displayError("there was an error");
      } else {
        displaySucc("Profile update successfully")
        closePage(false);
        getAllUsersData()
      }

      setLoading(false);
    }
  }

  useEffect(() => {
    getProfileData();

    // to avoid the console warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className='fixed top-0 left-0 min-h-screen w-full flex justify-center items-center bg-white/50 backdrop-blur-sm rounded z-20'>
      <div className='bg-white shadow p-2'>
        <div className='flex justify-between items-center'>
          <h3 className='text-2xl md:text-3xl font-medium'>Edit User</h3>
          <div className='cursor-pointer' onClick={() => { closePage(false) }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{ fill: "rgb(170,176,183)" }}>
              <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
            </svg>
          </div>
        </div>
        <form className='flex flex-col py-2' onSubmit={(e) => e.preventDefault()}>
          <div className='my-0.5 flex flex-col'>
            <label htmlFor="username" className='pb-0.5 md:text-lg font-medium'>User Name</label>
            <input type="text" value={UserName} onChange={(e) => setUserName(e.target.value)} name='username' placeholder='username' className='outline-none p-1 border border-[#F3F3F3] rounded' />
          </div>
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
            <button onClick={() => updateProfile()} className='py-1.5 w-full bg-main hover:bg-mainHover duration-200 rounded text-white'>{Loading ? "Wait" : "Update"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUser