import React, { useContext, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { UsersContext } from '../../UsersContextUsersContextProvider/UsersContextProvider';
import Boards from '../Boards';

export default function UserPage() {
    const navigate = useNavigate()
    const {id} = useParams();
    const [inputValue,setInputValue] = useState("")
    
    const user = useContext(UsersContext).users.find(user=>user.userId == id)
    const {addNewBoard} = useContext(UsersContext)

    function handleAddNewBoard(){
        addNewBoard(inputValue,id);
        setInputValue("");
    }
    
  return (
    <div className='UserPage'>
        <div className='header'>
            <button className='goBack' onClick={()=>{navigate('/')}}>Back</button>
            <h2>USER:{user.name}</h2>
        </div>
        <div className='boardBlocks'>
            {user.boards.map(board=>{
                console.log(board.boardId);
                return( <div 
                            onClick={()=>{navigate (`/users/${id}/boards/${board.boardId}`)}} 
                            className='boardBlock' 
                            key={board.boardId}>
                    {board.boardName}
                </div>)
            })}
            <div className='boardBlock'>
                <input 
                    className='newBoardInput' 
                    value={inputValue} 
                    onChange={e=>setInputValue(e.target.value)} />
                <button onClick={handleAddNewBoard} >ADD NEW BOARD</button>
            </div>
        </div>
        
    </div>
  )
}
