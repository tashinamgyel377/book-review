import { Routes, Route } from 'react-router-dom'
import Home from '../layout/Home'
import Login from '../layout/Login'

import ProtectedRoute from '../components/ProtectedRoute'
import SignIn from '../layout/SignUp/index';
import UserProfile from '../layout/Profile';
import Book from '../layout/Book';

const AppRoute = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/sign-up' element={<SignIn/>} />
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/book' element={<Book />} />
        {/* Add more protected routes here */}
        {/* Example: <Route path='/dashboard' element={<Dashboard />} /> */}
        {/* Add more protected routes here */}
      </Route>
    </Routes>
  )
}

export default AppRoute
