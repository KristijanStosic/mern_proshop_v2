import { FaUserCircle } from "react-icons/fa"

const Avatar = ({ src, type }) => {

    if (src) {
        return <img
            src={src}
            className="rounded-full"
            height={`${type === 'profile' ? '150' : '30'}`}
            width={`${type === 'profile' ? '150' : '30'}`}
        />
    }

    return (
        <FaUserCircle size={24} />
    )
}

export default Avatar