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

const Header = () => {
    const [isOpenDropdownMenu, setIsOpenDropdownMenu] = useState(false)

    const { user } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutApiCall] = useLogoutMutation()

    const logoutHandler = async () => {
        try {
            const response = await logoutApiCall().unwrap()
            dispatch(logout())
            navigate('/login')
            toast.success(response.message)
            setIsOpenDropdownMenu(false)
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }

    return (
        <div className='sticky py-4 border-b-[1px] border-b-slate-700 top-0 w-full bg-slate-200 z-30 shadow-sm text-slate-700'>
            <div className='p-3'>
                <Container>
                    <div className='flex items-center justify-between gap-3 md:gap-0'>
                        <Link to='/' className={`font-bold text-3xl`}>ProShop</Link>
                        <div className='hidden md:block'>Search</div>
                        <div className='flex items-center gap-8 md:gap-12'>
                            <CartHeaderCount />
                            {user ? (
                                <>
                                    <div className='relative flex flex-col items-center'>
                                        <button onClick={() => setIsOpenDropdownMenu((prev) => !prev)}
                                            className="focus:outline-none text-md flex items-center justify-between gap-2 text-slate-700" type="button">
                                            <FaUser size={24} />
                                            {user.name}

                                            {!isOpenDropdownMenu ? (
                                                <FaCaretDown className='h-6' />
                                            ) : (
                                                <FaCaretUp className='h-6' />
                                            )}
                                        </button>

                                        {isOpenDropdownMenu && (
                                            <div className="absolute top-10 divide-y divide-gray-100 rounded-md shadow w-44 bg-slate-500 focus:outline-none">
                                                <ul className="py-2 text-sm text-slate-50">
                                                    <li>
                                                        <Link to='/profile' className="inline-flex items-center px-4 py-2 hover:opacity-75"><FaUser className='mr-2' /> Profile</Link>
                                                    </li>
                                                    <li>
                                                        <button onClick={logoutHandler} className="inline-flex items-center px-4 py-2 hover:opacity-75"><FaArrowLeft className='mr-2' /> Logout</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='flex gap-3'>
                                        <Link to='/login' className='flex gap-2 hover:opacity-75 text-md'><FaUser size={24} /> Login</Link>
                                        <Link to='/register' className='flex gap-2 hover:opacity-75 text-md'><FaUserPlus size={24} /> Register</Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Header