import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Card, InputGroup } from 'react-bootstrap'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { registerSchema } from '../utils/validationSchemas'
import { useRegisterMutation } from '../slices/authApiSlice'
import { toast } from 'react-hot-toast'
import { setCredentials } from '../slices/authSlice'
import FormContainer from '../components/FormContainer'
import * as formik from 'formik'

const RegisterScreen = () => {
    const [showPassword, setShowPassword] = useState(false)

    const { Formik } = formik

    const { user } = useSelector((state) => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, { isLoading }] = useRegisterMutation()

    const handleRegisterSubmitForm = async (values) => {
        try {
            const response = await register({
                name: values.name,
                email: values.email,
                password: values.password
            }).unwrap()
            dispatch(setCredentials({ ...response }))
            navigate(redirect)
            toast.success(`Welcome aboard ${response.name}`)
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
        <Formik
            validationSchema={registerSchema}
            onSubmit={handleRegisterSubmitForm}
            initialValues={{
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                terms: false,
            }}
        >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
                <FormContainer>
                    <Card className='my-3 p-3 rounded'>
                        <h1 className='text-center text-uppercase'>Register</h1>

                        <Form noValidate onSubmit={handleSubmit}>

                            <Form.Group className='my-2' controlId="validationFormik01">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    isInvalid={!!errors.name}
                                    isValid={touched.name && !errors.name}
                                />

                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className='my-2' controlId="validationFormik02">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    isInvalid={!!errors.email}
                                    isValid={touched.email && !errors.email}
                                />

                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className='my-2' controlId="validationFormik03">
                                <Form.Label>Password</Form.Label>
                                <InputGroup style={{ cursor: 'pointer' }}>
                                    <Form.Control
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                        value={values.password}
                                        onChange={handleChange}
                                        isInvalid={!!errors.password}
                                        isValid={touched.password && !errors.password}
                                    />
                                    <InputGroup.Text onClick={togglePassword}>
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                    </InputGroup.Text>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type='valid'></Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className='my-2' controlId="validationFormik04">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    name="confirmPassword"
                                    type='password'
                                    placeholder="Confirm Password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    isInvalid={!!errors.confirmPassword}
                                    isValid={touched.confirmPassword && !errors.confirmPassword}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.confirmPassword}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type='valid'></Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="my-2" controlId='validationFormik05'>
                                <Form.Check
                                    name="terms"
                                    label="Agree to terms and conditions"
                                    onChange={handleChange}
                                    isInvalid={!!errors.terms}
                                    feedback={errors.terms}
                                    feedbackType="invalid"
                                />
                            </Form.Group>

                            <div className="d-grid">
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
                                    Already have an account?{' '}
                                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                                        Login
                                    </Link>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </FormContainer>
            )
            }
        </Formik >
    )
}

export default RegisterScreen