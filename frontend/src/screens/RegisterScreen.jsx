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
import Button from '../components/Button'
import LoadingButton from '../components/LoadingButton'
import PasswordStrengthIndicator from '../components/PasswordStrengthIndicator'
import PasswordInput from '../components/PasswordInput'

const RegisterScreen = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isPasswordStrong, setIsPasswordStrong] = useState(false)

    const { user } = useSelector((state) => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, { isLoading }] = useRegisterMutation()

    const registerHandler = async (e) => {
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
                <form onSubmit={registerHandler}>
                    <FormContainer>
                        <h1 className='text-slate-700 text-3xl font-semibold'>REGISTER</h1>

                        <Input
                            id='firstName'
                            label='First Name'
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            required
                            disabled={isLoading}
                        />

                        <Input
                            id='lastName'
                            label='Last Name'
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
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

                        <PasswordInput
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

                        <PasswordInput
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

                        <Button
                            type='submit'
                            disabled={isLoading || !isPasswordStrong}
                            buttonText={isLoading ? <LoadingButton /> : 'Register'}
                        />

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