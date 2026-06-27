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
import AdminDashboard from './pages/AdminDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import FarmerDashboard from './pages/FarmerDashboard';

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
        <Route path="/verify-success" element={<VerifyFailed />} />
        <Route path="/verify-success" element={<VerifySuccess />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
      </Routes >

    </BrowserRouter>
  )

}

export default App
