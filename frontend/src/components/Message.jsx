import { FaExclamationTriangle } from "react-icons/fa"
import Container from "./Container"

const Message = ({ children }) => {
    return (
        <Container>
            <div className='flex flex-col items-center justify-center p-4 rounded mt-10'>
                <div className="text-slate-700 text-3xl"><FaExclamationTriangle /></div>
                <div className='text-3xl text-slate-700 font-semibold'>{children}</div>
            </div>
        </Container>
    )
}

export default Message