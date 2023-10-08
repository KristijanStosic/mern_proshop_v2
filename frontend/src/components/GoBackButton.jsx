import React from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const GoBackButton = () => {
    const navigate = useNavigate()

    return (
        <Button className='btn-light my-3' onClick={() => navigate(-1)}>
            <FaArrowCircleLeft /> Go Back
        </Button>
    )
}

export default GoBackButton