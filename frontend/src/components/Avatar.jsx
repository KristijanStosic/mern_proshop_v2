import { FaUserCircle } from "react-icons/fa"

const Avatar = ({ src }) => {
    return (
        <>
            {src ? (
                <img src={src} alt='Avatar' className="rounded-full" height='30' width='30' />
            ) : (
                <>
                    <FaUserCircle size={24} />
                </>
            )}
        </>
    )
}

export default Avatar