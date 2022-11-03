import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UsersContext } from '../../UsersContextUsersContextProvider/UsersContextProvider'

export default function AdminPage() {
    const [inputValue,setInputValue] = useState("")
    const {users,addNewUser} = useContext(UsersContext)
    const navigate = useNavigate()
  
    function handleAddNewUser(){
      addNewUser(inputValue);
      setInputValue("")
    }

  return (
    <div className='AdminPage'>

      <div className='userBlocks'>
        {users.map(user=>{
          return (
            <div onClick={()=>{navigate(`/users/${user.userId}`)}} className='userBlock' key={user.userId}>
              <h1>{user.name}</h1>
            </div>
          )
        })}
        <div className='addNewUser userBlock'>
          <input value={inputValue} onChange= {(e)=>{setInputValue(e.target.value)}} />
          <button onClick={handleAddNewUser}>ADD NEW USER</button>
        </div>
      </div>
    </div>
  )
}
