import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const Rating = ({ rating, numberOfReviews, color }) => {
    return (
        <div className='flex items-center gap-3'>
            <div className='flex text-xl text-rose-600 gap-1'>
                <span>
                    {rating >= 1 ? (
                        <FaStar />
                    ) : rating >= 0.5 ? (
                        <FaStarHalfAlt />
                    ) : (
                        <FaRegStar />
                    )}
                </span>
                <span>
                    {rating >= 2 ? (
                        <FaStar />
                    ) : rating >= 1.5 ? (
                        <FaStarHalfAlt />
                    ) : (
                        <FaRegStar />
                    )}
                </span>
                <span>
                    {rating >= 3 ? (
                        <FaStar />
                    ) : rating >= 2.5 ? (
                        <FaStarHalfAlt />
                    ) : (
                        <FaRegStar />
                    )}
                </span>
                <span>
                    {rating >= 4 ? (
                        <FaStar />
                    ) : rating >= 3.5 ? (
                        <FaStarHalfAlt />
                    ) : (
                        <FaRegStar />
                    )}
                </span>
                <span>
                    {rating >= 5 ? (
                        <FaStar />
                    ) : rating >= 4.5 ? (
                        <FaStarHalfAlt />
                    ) : (
                        <FaRegStar />
                    )}
                </span>
            </div>
            <span className='text-md text-slate-700 font-medium'>
                {`${numberOfReviews === 0 ? '' : numberOfReviews} ${numberOfReviews === 0
                    ? 'No reviews'
                    : numberOfReviews === 1
                        ? 'Review'
                        : 'Reviews'
                    }`}
            </span>
        </div>
    )
}

Rating.defaultProps = {
    color: '#f8e825',
}

export default Rating