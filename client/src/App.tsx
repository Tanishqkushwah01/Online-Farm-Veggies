import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Terms from './pages/Terms';
import VerifyEmail from './pages/verifyEmail';
import PageNotFound from './pages/PageNotFound';
import VerifySuccess from './pages/VerifySuccess';
import VerifyFailed from './pages/VerifyFailed';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/terms' element={<Terms />} />
        <Route path='/verifyEmail' element={<VerifyEmail />} />
        <Route path='*' element={<PageNotFound />} />
       <Route path="/verify-success" element={<VerifySuccess />} />
        <Route path="/verify-failed" element={<VerifyFailed />} /> 
      </Routes >

    </BrowserRouter>
  )

}

export default App
