import { useState } from 'react'
import { InputGroup, Form } from 'react-bootstrap'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const PasswordInput = ({ placeholder, value, onChange, name }) => {
    const [showPassword, setShowPassword] = useState(false)

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <InputGroup style={{ cursor: 'pointer' }}>
            <Form.Control
                name={name}
                id='showPassword'
                onChange={onChange}
                value={value}
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
            ></Form.Control>
            <InputGroup.Text onClick={togglePassword}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
            </InputGroup.Text>
        </InputGroup>
    )
}

export default PasswordInput