import Container from '../components/Container'
import { FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

const NotFoundScreen = () => {
    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1)
    }

    return (
        <div className='p-8'>
            <Container>
                <div className='flex flex-col items-center justify-center gap-4 pt-12'>
                    <div className='text-slate-700 text-3xl'><FaExclamationTriangle size={48} /></div>
                    <div className='text-slate-700 text-3xl'><h1>404 - Page not found!</h1></div>
                    <div className='w-[300px]'>
                        <Button 
                        onClick={goBack}
                        buttonText='Go Back!' 
                        icon={<FaArrowLeft />}>
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default NotFoundScreen