import Avatar from '../components/Avatar'
import moment from 'moment'
import Rating from './Rating'

const ReviewsProduct = ({ product }) => {
    return (
        <div>
            {product.reviews.length === 0 ? (
                <div className='flex flex-col items-start'>
                    <div className='text-lg text-white font-semibold bg-rose-600 px-4 py-3 rounded-md w-full'>
                        No reviews for this product yet
                    </div>
                </div>
            ) : (
                <>
                    <div>
                        {product.reviews && product.reviews.map((review) => (
                                <div key={review._id}>
                                    <div className="max-w-[300px]">
                                        <div className='flex items-center justify-start gap-3'>
                                            <div className='font-semibold'>
                                                <Avatar src={review.user.image} />
                                            </div>
                                            <div className='font-semibold text-slate-700'>
                                                {review.name}
                                            </div>
                                            <div className='text-sm text-slate-700'>
                                                {moment(review.createdAt).fromNow()}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='mt-2'>
                                            <Rating rating={review.rating} />
                                        </div>
                                        <div className='mt-2'>
                                            <span className='font-semibold text-slate-700'>
                                                Comment: </span> {review.comment}
                                        </div>
                                    </div>
                                    <hr className='mt-4 mb-4' />
                                </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default ReviewsProduct