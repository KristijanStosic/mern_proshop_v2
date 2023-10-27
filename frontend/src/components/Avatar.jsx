import { FaUserCircle } from "react-icons/fa"

const Avatar = ({ src, type }) => {
    return (
        <>
            {src ? (
                <img 
                src={src} 
                alt='Avatar' 
                className="rounded-full" 
                height={`${type === 'profile' ? '150' : '30'}`} 
                width={`${type === 'profile' ? '150' : '30'}`} 
                 />
            ) : (
                <>
                    <FaUserCircle size={24} />
                </>
            )}
        </>
    )
}

export default Avatar