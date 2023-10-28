import { useCallback, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useLogoutMutation } from "../slices/authApiSlice"
import { logout } from "../slices/authSlice"
import { FaArrowLeft, FaArrowRight, FaCaretDown, FaCaretUp, FaShoppingBag, FaUserEdit, FaUserPlus } from "react-icons/fa"
import { MdAdminPanelSettings } from 'react-icons/md'
import { toast } from 'react-hot-toast'
import Avatar from "./Avatar"
import UserMenuItem from "./UserMenuItem"
import Backdrop from "./Backdrop"

const UserHeaderMenu = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleUserMenu = useCallback(() => {
        setIsOpen(prev => !prev)
    }, [])

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
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }

    return (
        <>
            <div className="relative z-30">
                <div className="
                p-2 
                border-[1px] 
                border-slate-400 
                flex 
                flex-row 
                items-center 
                gap-1 
                rounded-full 
                cursor-pointer 
                hover:shadow-md 
                transition 
                text-slate-700" 
                onClick={toggleUserMenu}
                >
                    <Avatar src={user?.image} />
                    {user && user.name}
                    {isOpen ? <FaCaretUp /> : <FaCaretDown />}
                </div>
                
                {isOpen && (
                    <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-md flex flex-col cursor-pointer">
                        {user ? (
                            <div>
                                {user.isAdmin && (
                                    <Link to='/admin'>
                                        <UserMenuItem 
                                        icon={<MdAdminPanelSettings className='mr-2' />}
                                        onClick={toggleUserMenu}>
                                            Admin Panel
                                        </UserMenuItem>
                                    </Link>
                                )}
                                <Link to='/profile'>
                                    <UserMenuItem
                                        icon={<FaUserEdit className='mr-2' />}
                                        onClick={toggleUserMenu}>My Profile</UserMenuItem>
                                </Link>
                                <Link to='/my-orders'>
                                    <UserMenuItem
                                        icon={<FaShoppingBag className="mr-2" />}
                                        onClick={toggleUserMenu}>
                                        Your Orders
                                    </UserMenuItem>
                                </Link>
                                <hr />
                                <UserMenuItem
                                    icon={<FaArrowLeft className="mr-2" />}
                                    onClick={() => {
                                        toggleUserMenu()
                                        logoutHandler()
                                    }}
                                >
                                    Logout
                                </UserMenuItem>
                            </div>
                        ) : (
                            <div>
                                <Link to='/login'>
                                    <UserMenuItem
                                        icon={<FaArrowRight className="mr-2" />}
                                        onClick={toggleUserMenu}>
                                        Login
                                    </UserMenuItem>
                                </Link>
                                <Link to='/register'>
                                    <UserMenuItem
                                        icon={<FaUserPlus className="mr-2" />}
                                        onClick={toggleUserMenu}>
                                        Register
                                    </UserMenuItem>
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {isOpen ? <Backdrop onClick={toggleUserMenu} /> : null}
        </>
    )
}

export default UserHeaderMenu