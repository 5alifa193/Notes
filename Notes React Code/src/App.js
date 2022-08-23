import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar/Navbar';
import SignUp from './SingUp/SignUp';
import {Routes , Route} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import DataContextProvider from './DataContext';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import NotFound from './NotFound/NotFound';

function App() {
  return (
    <>
    <Navbar/>

    <Routes>
      <Route path='/' element={
      <ProtectedRoute>
      <Home/>
      </ProtectedRoute>
      }/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    </>
  );
}

export default App;
