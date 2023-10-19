import { Link, useLocation } from "react-router-dom"
import { FaProductHunt, FaStar, FaUser } from 'react-icons/fa'
import { MdDashboard, MdFormatListBulleted } from 'react-icons/md'
import { TbBrandBooking, TbBrandMedium } from 'react-icons/tb'
import Container from "../Container"
import AdminNavItem from "./AdminNavItem"

const AdminNav = () => {
    const location = useLocation()

    return (
        <div className='w-full shadow-sm top-20 border-b-[1px] pt-4'>
            <Container>
                <div className='flex flex-row items-center justify-between flex-nowrap md:justify-center gap-8 md:gap-12 overflow-x-auto'>
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
                            icon={<MdFormatListBulleted size={20} />}
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
                            icon={<TbBrandMedium size={20} />}
                            selected={location.pathname === '/admin/all-models'}
                        />
                    </Link>
                    <Link to='/admin/all-brands'>
                        <AdminNavItem
                            label='Brands'
                            icon={<TbBrandBooking size={20} />}
                            selected={location.pathname === '/admin/all-brands'}
                        />
                    </Link>
                    <Link to='/admin/all-reviews'>
                        <AdminNavItem
                            label='Reviews'
                            icon={<FaStar size={20} />}
                            selected={location.pathname === '/admin/all-reviews'}
                        />
                    </Link>
                </div>
            </Container>
        </div>)
}

export default AdminNav