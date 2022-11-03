import React, { useContext, useState } from 'react'
import { UsersContext } from '../../UsersContextUsersContextProvider/UsersContextProvider'

export default function Tasks({ tasks,Userid,boardId }) {
    const [inputStatus, setInputStatus] = useState("")
    const [inputNewTask ,setInputNewTask] = useState("")
    const statuses = Object.keys(tasks)

    const {addNewStatus,deleteStatus,addNewTask,editStatus,deleteTask} = useContext(UsersContext)

    function handleAddNewStatus(){
        if(inputStatus){
            addNewStatus(inputStatus,Userid,boardId);
            setInputStatus("")
        }   
    }
    function handleAddNewTask(){
        if(inputNewTask){
            addNewTask(inputNewTask,Userid,boardId );
            setInputNewTask("")
        }  
    }
    function hadnleEditStatus(oldStatus,newStatus,task){
        editStatus(oldStatus,newStatus,task,Userid,boardId)
    }
    function handleDeleteTask(taskId,status){
        deleteTask(taskId,status,Userid,boardId)
    }

    return (
        <>
            <div className='newStatus'>
                <input
                    value={inputStatus}
                    onChange={e => { setInputStatus(e.target.value) }}
                    placeholder="new status" />
                <button onClick={handleAddNewStatus}>ADD NEW STATUS</button>
            </div>
            <div className='tasks'>
                {

                    statuses.map(status => {
                        return (
                            <div className='taskColumn' key={status}>
                                <h1 className='statusTitle'>{status}</h1>
                                <div className='tasksdiv'>
                                {tasks[status].map(task => {
                                    return (
                                        <div key={task.taskId} className='task'>
                                            <div>
                                                <h3>{task.taskName}</h3>
                                                <button onClick={()=>handleDeleteTask(task.taskId,status)}>DELETE</button>
                                            </div>
                                            <div className='taskManageButtons'>
                                                {statuses.map(st => {
                                                    return (
                                                        <button onClick={()=>{hadnleEditStatus(status,st,task)}} disabled={st == status} key={st} >{st}</button>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })}
                                </div>
                                {
                                    status == "todo" ?
                                        <div>
                                            <input 
                                                value={inputNewTask} 
                                                onChange={e=>{setInputNewTask(e.target.value)}}
                                                placeholder="new task"/>
                                            <button onClick={handleAddNewTask}>add new task</button>
                                        </div>
                                        : <button onClick={()=>{
                                            deleteStatus(status,Userid,boardId)
                                        }}>Delete status</button>
                                }

                            </div>)
                    })
                }
            </div>
        </>
    )
}
