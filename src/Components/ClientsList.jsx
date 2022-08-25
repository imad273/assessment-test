import React from 'react';
import { useRef, useEffect, useState } from 'react';
import EditClient from './EditClient';
import AddClient from './AddClient';

function ClientsList({ keyword }) {

  const [Wait, setWait] = useState(true);

  const [ClientData, setClientData] = useState([]);

  const [CardDropDown, setCardDropDown] = useState(false);
  const [CardDropDownId, setCardDropDownId] = useState(0);

  const [Colors, setColors] = useState([]);

  const [AddClientPage, setAddClientPage] = useState(false);
  const [EditClientPage, setEditClientPage] = useState(false);

  const [Error, setError] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState("error");

  const [Success, setSuccess] = useState(false);
  const [SuccessMsg, setSuccessMsg] = useState("success");

  const cardsDropDown = useRef(null);

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

  const getAllClientsData = async () => {
    setWait(true);

    const request = await fetch('https://test-api-9kapg.qafilaty.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          {
            allClients {
              id
              person {
                id
                first_name
                last_name
                email
                phone01
                phone02
                city
                address
                deleted
              }
            }
          }
        `
      })
    })

    const response = await request.json();
    setClientData(response.data.allClients);
    setWait(false);

    return response.data.allClients;
  }

  const makeColors = async () => {
    const colors = ["#FF006E", "#FF7F3F", "#5800FF", "#3CCF4E", "#FF6FB5", "#B3541E"];

    const newColor = [];
    const Data = await getAllClientsData();

    for (var i = 0; i < Data.length; i++) {
      const selectedColor = colors[Math.floor(Math.random() * colors.length)];

      newColor.push({
        id: Data[i].id,
        color: selectedColor
      })
    }

    setColors(newColor);
  }

  const deleteClient = async (id) => {
    const request = await fetch('https://test-api-9kapg.qafilaty.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation CREATE {
            deleteClient(id_person: "${id}") {
              status
            }
          }
        `
      })
    })

    const response = await request.json();

    if (response.data.deleteClient.status === false) {
      displayError("There was an error")
    } else {
      displaySucc("Success");
      getAllClientsData();
    }
  }

  useEffect(() => {
    makeColors();
    getAllClientsData();

    document.addEventListener("click", (e) => {
      // hide the Users card DropDown menu when click out side
      if (cardsDropDown.current !== null && !cardsDropDown.current.contains(e.target)) {
        setCardDropDown(false);
      }
    })
  }, [])


  useEffect(() => {
    const search = () => {
      let newData = [];

      if (keyword === '') {
        getAllClientsData();
      } else {

        ClientData.filter(user => {
          if (user.person.first_name.toLowerCase().includes(keyword.toLowerCase())) {
            newData.push(user)
          }

          return newData
        })

        setClientData(newData);
      }
    }

    search();

    // to avoid the console warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword])

  return (
    <div className='relative'>
      <div className={`${!Error && "hidden"} w-5/6 fixed bg-red-500 mt-2 rounded z-30`}>
        <p className="text-white font-medium text-center text-lg">{ErrorMsg}</p>
      </div>
      <div className={`${!Success && "hidden"} w-5/6 fixed bg-green-500 mt-2 rounded z-30`}>
        <p className="text-white font-medium text-center text-lg">{SuccessMsg}</p>
      </div>

      {AddClientPage &&
        <AddClient displayError={displayError} displaySucc={displaySucc} closePage={setAddClientPage} getAllClientsData={getAllClientsData} />
      }

      {EditClientPage &&
        <EditClient displayError={displayError} displaySucc={displaySucc} closePage={setEditClientPage} getAllUsersData={getAllClientsData} person_id={CardDropDownId} />
      }

      <div className='header flex justify-between items-center'>
        <h3 className='text-3xl font-medium'>Clients List</h3>
        <button onClick={() => { setAddClientPage(true) }} className='py-1.5 px-2 bg-main hover:bg-mainHover duration-200 rounded text-white'>Add Client</button>
      </div>

      {Wait ?
        <div className='absolute top-10 flex justify-center items-center w-full h-full'>
          <p className='text-2xl font-meduim'>Loading</p>
        </div>
        :
        <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-x-3 gap-y-3 my-4'>
          {ClientData.length !== 0 ?
            ClientData.map((client, key) => {
              const theColor = Colors.filter(clr => clr.id === client.id && clr.color)

              return (
                <div key={key} className='card relative bg-white shadow p-2 rounded'>
                  <div className='card-header flex justify-between items-center'>
                    <div className='flex items-center'>
                      <div style={{ backgroundColor: Colors.length > 0 && theColor[0].color }} className={`text-white w-8 h-8 rounded-full flex justify-center items-center`}>
                        <p className='relative bottom-px'>{client.person.first_name[0]}</p>
                      </div>
                      <div className='ml-2 font-semibold'>
                        <p>{client.person.first_name}</p>
                      </div>
                    </div>
                    <div className='cursor-pointer' ref={cardsDropDown} onClick={(e) => { e.stopPropagation(); setCardDropDownId(client.id); setCardDropDown(true) }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{ fill: "rgba(35, 35, 35)" }}>
                        <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                      </svg>
                      {CardDropDownId === client.id &&
                        <div id="navbarDropDown" className={`absolute right-1 ${!CardDropDown && "hidden"} mt-4 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700`}>
                          <ul className="py-1 text-sm text-gray-200" aria-labelledby="navbarDropDownDefault">
                            <button onClick={() => { setEditClientPage(true) }} className="w-full py-1 dark:hover:bg-gray-600 dark:hover:text-white">
                              Edit
                            </button>
                            <button onClick={() => { deleteClient(client.person.id) }} className="w-full py-1 dark:hover:bg-gray-600 dark:hover:text-white">
                              Delete
                            </button>
                          </ul>
                        </div>
                      }
                    </div>

                  </div>
                  <div className='mt-6'>
                    <div className="flex items-center">
                      <div>
                        <svg width="20" height="20" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg" style={{ fill: "rgb(170,176,183)" }}>
                          <path d="M12 2C7.589 2 4 5.589 4 9.995 3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12 0-4.411-3.589-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"></path>
                        </svg>
                      </div>
                      <div className='text-sm text-gray-700 ml-2'>
                        {client.person.address}, {client.person.city}
                      </div>
                    </div>
                    <div className='w-full h-px bg-gray-200 my-2'></div>
                    <div className="flex items-center">
                      <div>
                        <svg viewBox="0 0 25 25" width="20" height="20" xmlns="http://www.w3.org/2000/svg" style={{ fill: "rgb(170,176,183)" }}>
                          <path d="m20.487 17.14-4.065-3.696a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a.997.997 0 0 0-.085-1.39z"></path>
                        </svg>
                      </div>
                      <div className='text-sm text-gray-700 ml-2'>
                        {client.person.phone01}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })

            :
            <div className='absolute top-10 flex justify-center items-center w-full h-full'>
              <p className='text-2xl font-meduim'>No Result Was Found</p>
            </div>
          }

        </div>
      }
    </div>
  )
}

export default ClientsList