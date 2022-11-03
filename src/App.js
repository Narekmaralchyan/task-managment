import './App.css';
import { Route, Routes } from 'react-router-dom';
import AdminPage from './Components/AdminPage';
import UsersContextProvider from './UsersContextUsersContextProvider/UsersContextProvider';
import UserPage from './Components/UserPage';
import Boards from './Components/Boards';


function App() {
  return (
    <UsersContextProvider>
      <div className="App">
      <Routes>
        <Route path='/' element={<AdminPage />}/>
        <Route path='/users/:id' element={<UserPage />} />
        <Route path='/users/:Userid/boards/:boardId' element={<Boards />} />
      </Routes>
    </div>
    </UsersContextProvider>
    
  );
}

export default App;
