import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap'
import { FaShoppingCart, FaUser, FaUserPlus, FaHome, FaArrowLeft } from 'react-icons/fa'
import { logout } from '../slices/authSlice'
import { useLogoutMutation } from '../slices/authApiSlice'
import logo from '../assets/logo.png'
import SearchBox from './SearchBox'
import toast from 'react-hot-toast'

const Header = () => {
    const { user } = useSelector((state) => state.auth)
    const { cartItems } = useSelector((state) => state.cart)

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
        <header>
            <Navbar className='py-3' bg='dark' variant='dark' expand='md' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>
                            <img src={logo} alt='ProShop' />
                            ProShop
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <SearchBox />
                        <Nav className='ms-auto'>
                            <LinkContainer to='/'>
                                <Nav.Link><FaHome /> Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/cart'>
                                <Nav.Link><FaShoppingCart /> Cart
                                    <Badge pill bg='' style={{ marginLeft: '5px', backgroundColor: 'crimson' }}>
                                        {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                    </Badge>
                                </Nav.Link>
                            </LinkContainer>
                            {user ? (
                                <>
                                    <NavDropdown title={user.name} id='username'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item className='text-primary'><FaUser /> Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item className='text-primary' onClick={logoutHandler}>
                                            <FaArrowLeft /> Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : (
                                <>
                                    <LinkContainer to='/login'>
                                        <Nav.Link>
                                            <FaUser /> Login
                                        </Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to='/register'>
                                        <Nav.Link>
                                            <FaUserPlus /> Register
                                        </Nav.Link>
                                    </LinkContainer>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header