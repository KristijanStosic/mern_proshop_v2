import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Container from '../Container'
import AdminNav from './AdminNav'

const AdminRoute = () => {
    const { user } = useSelector((state) => state.auth)
    return user && user.isAdmin ? (
        <>
        <AdminNav />
        <Outlet />
        </>
    ) : (
        <Navigate to='/login' replace />
    )
}

export default AdminRoute