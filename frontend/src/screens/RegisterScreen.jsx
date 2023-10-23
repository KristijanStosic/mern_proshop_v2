import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../slices/authApiSlice'
import { toast } from 'react-hot-toast'
import { setCredentials } from '../slices/authSlice'
import { validateEmail } from '../utils/validateEmail'
import Container from '../components/Container'
import FormContainer from '../components/FormContainer'
import Input from '../components/Input'
import PasswordStrengthIndicator from '../components/PasswordStrengthIndicator'

const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isPasswordStrong, setIsPasswordStrong] = useState(false);

    const { user } = useSelector((state) => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, { isLoading }] = useRegisterMutation()

    const handleRegisterSubmitForm = async (e) => {
        e.preventDefault()

        try {
            if (!validateEmail(email)) {
                return toast.error('Please enter valid email')
            }

            if (password !== confirmPassword) {
                return toast.error('Passwords do not match')
            }

            const response = await register({
                name: name,
                email: email,
                password: password
            }).unwrap()
            dispatch(setCredentials({ ...response }))
            navigate(redirect)
            toast.success(`Welcome aboard ${response.name}`)
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }

    useEffect(() => {
        if (user) {
            navigate(redirect)
        }
    }, [navigate, redirect, user])

    return (
        <>
            <Container>
                <form onSubmit={handleRegisterSubmitForm}>
                    <FormContainer>
                        <h1 className='text-slate-700 text-3xl font-semibold'>REGISTER</h1>

                        <Input
                            id='name'
                            label='Name'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                            disabled={isLoading}
                        />

                        <Input
                            id='email'
                            label='Email'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            disabled={isLoading}
                        />

                        <Input
                            id='password'
                            label='Password'
                            type='password'
                            disabled={isLoading}
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            onPaste={(e) => {
                                e.preventDefault()
                                toast.error('Cannot paste into password field')
                                return false
                            }}
                        />

                        <Input
                            id='confirmPassword'
                            label='Confirm Password'
                            type='password'
                            disabled={isLoading}
                            value={confirmPassword}
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onPaste={(e) => {
                                e.preventDefault()
                                toast.error('Cannot paste into password field')
                                return false
                            }}
                        />

                        {password && <PasswordStrengthIndicator 
                                        password={password} 
                                        onPasswordStrengthChange={(isStrong) => setIsPasswordStrong(isStrong)}
                                    />
                        }

                        <button
                            type='submit'
                            disabled={isLoading || !isPasswordStrong}
                            className='
                                px-4
                                py-3
                                bg-slate-700
                                w-full
                                text-white
                                disabled:opacity-75 
                                disabled:cursor-not-allowed
                                rounded-md
                                hover:opacity-75 
                                transition 
                                border-slate-700 
                                flex 
                                items-center 
                                justify-center 
                                gap-2'>
                            {isLoading ? 'Loading...' : 'Submit'}
                        </button>

                        <p className='text-sm text-slate-700'>Already have an account?{' '}
                            <Link className='underline' to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                                Login
                            </Link>
                        </p>

                    </FormContainer>
                </form>
            </Container>
        </>
    )
}

export default RegisterScreen