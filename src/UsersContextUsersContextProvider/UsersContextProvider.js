import React, { createContext, useEffect, useReducer } from 'react'
import { v4 as uuid } from 'uuid';

const initialState =[
  {
    userId:uuid(),
    name:"narek",
    boards:[{
      boardId:uuid(),
      boardName:"JS",
      tasks:{
        todo:[{taskId:uuid(),taskName:"learn Redux"} ,{taskId:uuid(),taskName:"learn TypeScript"}],
        doing:[{taskId:uuid(),taskName:"learn React"}],
        done:[{taskId:uuid(),taskName:"learn JS"}]
      }
    }]
  }
]

export const ACTION_TYPES = {
  ADD_NEW_USER :"ADDNEWUSER",
  ADD_NEW_BOARD:"ADDNEWBOARD",
  ADD_NEW_STATUS:"ADDNEWSTATUS",
  DELETE_STATUS:"DELETESTATUS",
  ADD_NEW_TASK:"ADDNEWTASK",
  EDIT_STATUS:"EDITSTATUS",
  DELETE_TASK:"DELETETASK",
}

function reducer(state,action){
  switch(action.type){
    case ACTION_TYPES.ADD_NEW_USER:{
      const {newUserName} = action.payload
      return [
        ...state,
        {
          userId:uuid(),
          name:newUserName,
          boards:[]
        }
      ]
    }
    case ACTION_TYPES.ADD_NEW_BOARD:{
      const {userId,newBoardName} = action.payload
      return [
        
        ...state.map(user=>{
          if(user.userId == userId)
            {
              user.boards.push({
                boardId:uuid(),
                boardName:newBoardName,
                tasks:{
                  todo:[],
                  doing:[],
                  done:[]
                }
              })
          }
          return user;
        }),
      ]
    }
    case ACTION_TYPES.ADD_NEW_STATUS:{
      const {newStatus,userId,boardId} = action.payload;
      return [
        ...state.map(user=>{
          if(user.userId == userId){
            user.boards.map(board=>{
              if(board.boardId == boardId){
                board.tasks[newStatus] =[]
              }
              return board;
            })

          }
          return user;
        })
      ]
    }
    case ACTION_TYPES.ADD_NEW_TASK:{
      const {newTask,userId,boardId} = action.payload;
      return [
        ...state.map(user=>{
          if(user.userId == userId){
            user.boards.map(board=>{
              if(board.boardId == boardId){
                board.tasks['todo']=[...board.tasks['todo'],{taskId:uuid(),taskName:newTask}]
              }
              return board;
            })

          }
          return user;
        })
      ]
      
    }
    case ACTION_TYPES.EDIT_STATUS:{
      const {oldStatus,newStatus,task,userId,boardId} = action.payload;
      return[
        ...state.map(user=>{
          if(user.userId == userId){
            user.boards.map(board=>{
              if(board.boardId == boardId){
                board.tasks[oldStatus]= board.tasks[oldStatus].filter(tk=> tk.taskId != task.taskId);
                board.tasks[newStatus] = [...board.tasks[newStatus],task]
              }
              return board;
            })

          }
          return user;
        })
      ]
    }
    case ACTION_TYPES.DELETE_STATUS:{
      const {statusName,userId,boardId} = action.payload
      return [
        ...state.map(user=>{
          if(user.userId == userId){
            user.boards.map(board=>{
              if(board.boardId == boardId){
                delete board.tasks[statusName]
              }
              return board;
            })

          }
          return user;
        })
      ]
    }
    case ACTION_TYPES.DELETE_TASK:{
      const {taskId,status,userId,boardId} = action.payload;
      return [
        ...state.map(user=>{
          if(user.userId == userId){
            user.boards.map(board=>{
              if(board.boardId == boardId){
                board.tasks[status] = board.tasks[status].filter(task => task.taskId != taskId)
              }
              return board;
            })

          }
          return user;
        })
      ]
    }

    default: return state;
  }
}
const UsersContext = createContext(initialState)

export default function UsersContextProvider({children}) {

  const [users,dispatch] = useReducer(reducer,localStorage.getItem("users")?JSON.parse(localStorage.getItem("users")): initialState)

  function local(){
    localStorage.setItem("users",JSON.stringify(users))
  }
  useEffect(()=>{
    localStorage.setItem("users",JSON.stringify(users))
  })

  function addNewUser(newUserName){
    dispatch (
      {
        type:ACTION_TYPES.ADD_NEW_USER,
        payload:{
          newUserName:newUserName,
        }
      }
    )
  }
  function addNewBoard(newBoardName,id){
    dispatch(
      {
        type:ACTION_TYPES.ADD_NEW_BOARD,
        payload:{
          userId:id,
          newBoardName:newBoardName,
        }
      }

    )
  }
  function addNewStatus(newStatus,userId,boardId){
    dispatch(
      {
        type:ACTION_TYPES.ADD_NEW_STATUS,
        payload:{
          newStatus,
          userId,
          boardId
        }
      }
    )
  }
  function deleteStatus(statusName,userId,boardId){
    dispatch({
      type:ACTION_TYPES.DELETE_STATUS,
      payload:{
        statusName,
        userId,
        boardId,
      }
    })
  }
  function addNewTask(newTask,userId,boardId){
    dispatch({
      type:ACTION_TYPES.ADD_NEW_TASK,
      payload:{
        newTask,
        userId,
        boardId,
      }
    })
  }
  function editStatus(oldStatus,newStatus,task,userId,boardId){
    dispatch({
      type:ACTION_TYPES.EDIT_STATUS,
      payload:{
        oldStatus,
        newStatus,
        task,
        userId,
        boardId
      }
    })
  }
  function deleteTask(taskId,status,userId,boardId){
    dispatch({
      type:ACTION_TYPES.DELETE_TASK,
      payload:{
        taskId,
        status,
        userId,
        boardId
      }
    })
  }

  return (
    <UsersContext.Provider value={{users,addNewUser,addNewBoard,addNewStatus,deleteStatus,addNewTask,deleteTask,editStatus}}>
      {children}
    </UsersContext.Provider>
  )
}

export { UsersContext };

