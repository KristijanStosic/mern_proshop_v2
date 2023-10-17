import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ToastNotifications from './components/ToastNotifications'

const App = () => {
  return (
    <>
      <ToastNotifications />
      <div className='flex flex-col min-h-screen'>
        <Header />
        <main className='flex-grow'><Outlet /></main>
        <Footer />
      </div>
    </>
  )
}

export default App