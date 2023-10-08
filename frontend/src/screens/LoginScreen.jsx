import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Card, InputGroup } from 'react-bootstrap'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { loginSchema } from '../utils/validationSchemas'
import { useLoginMutation } from '../slices/authApiSlice'
import { setCredentials } from '../slices/authSlice'
import FormContainer from '../components/FormContainer'
import * as formik from 'formik'
import { toast } from 'react-hot-toast'

const LoginScreen = () => {
    const [showPassword, setShowPassword] = useState(false)

    const { Formik } = formik

    const { user } = useSelector((state) => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()

    const handleLoginSubmitForm = async (values) => {
        try {
            const response = await login({
                email: values.email,
                password: values.password
            }).unwrap()
            dispatch(setCredentials({ ...response }))
            navigate(redirect)
            toast.success('Logged in successfully!')
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    useEffect(() => {
        if (user) {
            navigate(redirect)
        }
    }, [navigate, redirect, user])

    return (
        <>
            <Formik
                validationSchema={loginSchema}
                onSubmit={handleLoginSubmitForm}
                initialValues={{
                    email: '',
                    password: '',
                }}
            >
                {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                    <FormContainer>
                        <Card className='my-3 p-3 rounded'>
                            <h1 className='text-center text-uppercase'>Login</h1>

                            <Form noValidate onSubmit={handleSubmit}>

                                <Form.Group className='my-2' controlId="validationFormik01">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={!!errors.email}
                                        isValid={touched.email && !errors.email}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {touched.email && errors.email}
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback></Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className='my-2' controlId="validationFormik02">
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup style={{ cursor: 'pointer' }}>
                                        <Form.Control
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.password}
                                            isValid={touched.password && !errors.password}
                                        />
                                        <InputGroup.Text onClick={togglePassword}>
                                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                                        </InputGroup.Text>
                                        <Form.Control.Feedback type="invalid">
                                            {touched.password && errors.password}
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback></Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>

                                <div className="d-grid gap-1">
                                    <Button
                                        type='submit'
                                        variant="primary"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Loading…' : 'Submit'}
                                    </Button>
                                </div>
                            </Form>

                            <div className="d-flex justify-content-center align-items-center">
                                <Row className='py-3'>
                                    <Col>
                                        Don't have an account?{' '}
                                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                                            Register
                                        </Link>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </FormContainer>
                )}
            </Formik>
        </>
    )
}

export default LoginScreen