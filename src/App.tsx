import AppRoute from './components/AppRoutes'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <>
    <NavBar/>
      <AppRoute />
      <ToastContainer position='bottom-right' />
    </>
  )
}

export default App
