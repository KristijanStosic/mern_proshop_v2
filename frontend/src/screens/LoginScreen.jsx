import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../slices/authApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-hot-toast'
import Input from '../components/Input'
import Button from '../components/Button'
import Container from '../components/Container'
import FormContainer from '../components/FormContainer'
import LoadingButton from '../components/LoadingButton'
import PasswordInput from '../components/PasswordInput'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { user } = useSelector((state) => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()

    const loginHandler = async (e) => {
        e.preventDefault()
        try {
            const response = await login({
                email: email,
                password: password
            }).unwrap()
            dispatch(setCredentials({ ...response }))
            navigate(redirect)
            toast.success('Logged in successfully!')
        } catch (error) {
            toast.error(error?.data?.message || error.error)
            setEmail('')
            setPassword('')
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
                <form onSubmit={loginHandler}>
                    <FormContainer>
                        <h1 className='text-slate-700 text-3xl font-semibold'>
                            LOGIN
                        </h1>

                        <Input
                            id='email'
                            label='Email'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            disabled={isLoading}
                            required
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

                        <Button
                            type='submit'
                            disabled={isLoading}
                            buttonText={isLoading ? <LoadingButton /> : 'Login'}
                        />

                        <p className='text-sm text-slate-700'>Don't have an account?{' '}
                            <Link className='underline' to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                        </p>
                        
                    </FormContainer>
                </form>
            </Container>
        </>
    )
}

export default LoginScreen