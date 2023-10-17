import React from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Button from './Button'

const GoBackButton = () => {
    const navigate = useNavigate()

    return (
        <Button
            onClick={() => navigate(-1)}
            buttonText='Go Back!'
            small
            outline
            icon={<FaArrowCircleLeft size={16} />}
        >
        </Button>
    )
}

export default GoBackButton