import { Container, Button } from 'react-bootstrap'
import { FaExclamationTriangle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const NotFoundScreen = () => {
    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1)
    }

    return (
        <div className='d-flex justify-content-center align-items-center my-5 py-5'>
            <Container>
                <h1 className='text-center'>
                    <FaExclamationTriangle size={50} /> 404 - Page Not Found!
                </h1>
                <Container className='d-flex justify-content-center'>
                    <Button size='lg' onClick={goBack}>Go Back</Button>
                </Container>
            </Container>
        </div>
    )
}

export default NotFoundScreen