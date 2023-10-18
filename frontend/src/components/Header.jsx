import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaUserPlus, FaHome, FaArrowLeft, FaCaretDown, FaCaretUp } from 'react-icons/fa'
import { logout } from '../slices/authSlice'
import { Link } from 'react-router-dom'
import { useLogoutMutation } from '../slices/authApiSlice'
import Container from './Container'
import SearchBox from './SearchBox'
import toast from 'react-hot-toast'
import CartHeaderCount from './CartHeaderCount'
import UserHeaderMenu from './UserHeaderMenu'

const Header = () => {
    
    return (
        <div className='sticky py-4 border-b-[1px] border-b-slate-700 top-0 w-full bg-slate-200 z-30 shadow-sm text-slate-700'>
            <div className='p-3'>
                <Container>
                    <div className='flex items-center justify-between gap-3 md:gap-0'>
                        <Link to='/' className={`font-bold text-3xl`}>ProShop</Link>
                        <div className='hidden md:block'>Search</div>
                        <div className='flex items-center gap-8 md:gap-12'>
                            <CartHeaderCount />
                            <UserHeaderMenu />
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Header