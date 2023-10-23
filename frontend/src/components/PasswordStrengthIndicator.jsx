import { useEffect, useState } from "react"
import { NUMBER_REGEX, SPECIAL_CHARACTER_REGEX, UPPERCASE_LOWERCASE_PASSWORD_REGEX } from '../utils/regex'
import { FaCheck, FaTimes } from 'react-icons/fa'

const PasswordStrengthIndicator = ({ password, onPasswordStrengthChange }) => {
    const [uCase, setUCase] = useState(false)
    const [num, setNum] = useState(false)
    const [sChar, setSChar] = useState(false)
    const [passLength, setPassLength] = useState(false)

    const timesIcon = <FaTimes className='text-red-500' size={16} />
    const checkIcon = <FaCheck className='text-green-500' size={16} />

    const switchIcon = (condition) => {
        if (condition) {
            return checkIcon
        }
        return timesIcon
    }

    const isStrong = uCase && num && sChar && passLength 

    onPasswordStrengthChange(isStrong)

    useEffect(() => {
        // Check Lower and Uppercase
        if (password.match(UPPERCASE_LOWERCASE_PASSWORD_REGEX)) {
            setUCase(true)
        } else {
            setUCase(false)
        }

        // Check for numbers
        if (password.match(NUMBER_REGEX)) {
            setNum(true)
        } else {
            setNum(false)
        }

        // Check for special character
        if (password.match(SPECIAL_CHARACTER_REGEX)) {
            setSChar(true)
        } else {
            setSChar(false)
        }

        // Check for PASSWORD LENGTH
        if (password.length > 6) {
            setPassLength(true)
        } else {
            setPassLength(false)
        }
    }, [password, onPasswordStrengthChange])

    return (
        <div className='bg-slate-200 w-full rounded-md py-2 text-slate-700'>
            <ul>
                <li>
                    <span className='inline-flex items-center'>
                        {switchIcon(uCase)}
                        &nbsp; Lowercase & Uppercase
                    </span>
                </li>
                <li>
                    <span className='inline-flex items-center'>
                        {switchIcon(num)}
                        &nbsp; Number (0-9)
                    </span>
                </li>
                <li>
                    <span className='inline-flex items-center'>
                        {switchIcon(sChar)}
                        &nbsp; Special Character (!@#$%^&*.)
                    </span>
                </li>
                <li>
                    <span className='inline-flex items-center'>
                        {switchIcon(passLength)}
                        &nbsp; At least 6 Characters
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default PasswordStrengthIndicator