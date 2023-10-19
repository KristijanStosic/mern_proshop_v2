import { Link, useLocation } from "react-router-dom"
import Container from "../Container"
import AdminNavItem from "./AdminNavItem"
import { FaProductHunt, FaUser } from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'

const AdminNav = () => {
    const location = useLocation()

    return (
        <div className='w-full shadow-sm top-20 border-b-[1px] pt-4'>
            <Container>
                <div className='flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap'>
                    <Link to='/admin/all-products'>
                        <AdminNavItem
                            label='Products'
                            icon={<FaProductHunt size={20} />}
                            selected={location.pathname === '/admin/all-products'}
                        />
                    </Link>
                    <Link to='/admin/all-users'>
                        <AdminNavItem
                            label='Users'
                            icon={<FaUser size={20} />}
                            selected={location.pathname === '/admin/all-users'}
                        />
                    </Link>
                    <Link to='/admin/all-orders'>
                        <AdminNavItem
                            label='Orders'
                            icon={<MdDashboard size={20} />}
                            selected={location.pathname === '/admin/all-orders'}
                        />
                    </Link>
                    <Link to='/admin/all-categories'>
                        <AdminNavItem
                            label='Categories'
                            icon={<MdDashboard size={20} />}
                            selected={location.pathname === '/admin/all-categories'}
                        />
                    </Link>
                    <Link to='/admin/all-models'>
                        <AdminNavItem
                            label='Models'
                            icon={<MdDashboard size={20} />}
                            selected={location.pathname === '/admin/all-models'}
                        />
                    </Link>
                    <Link to='/admin/all-brands'>
                        <AdminNavItem
                            label='Brands'
                            icon={<MdDashboard size={20} />}
                            selected={location.pathname === '/admin/all-brands'}
                        />
                    </Link>
                </div>
            </Container>
        </div>)
}

export default AdminNav