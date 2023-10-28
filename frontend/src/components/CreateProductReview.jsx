import { useState } from "react"
import { useParams } from "react-router-dom"
import { useCreateReviewMutation, useGetProductByIdQuery } from "../slices/productsApiSlice"
import { FaStar } from "react-icons/fa"
import { toast } from 'react-hot-toast'
import Input from "./Input"
import Button from "./Button"
import LoadingButton from "./LoadingButton"
import { useSelector } from "react-redux"

const CreateProductReview = ({ product }) => {
    const { productId } = useParams()

    const { user } = useSelector((state) => state.auth)

    const { refetch } = useGetProductByIdQuery(productId)

    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState('')
    const [hover, setHover] = useState(0)

    const [createReview, { isLoading }] = useCreateReviewMutation()

    const createReviewHandler = async (e) => {
        e.preventDefault()

        try {
            const res = await createReview({
                productId,
                rating,
                comment,
            }).unwrap()
            toast.success(res.message)
            refetch()
            setComment('')
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }

    const alreadyReviewed = product.reviews.some((review) => review.user._id === user._id.toString())

    return (
        <>
            {alreadyReviewed ? (
                <div className="bg-slate-100 border px-3 py-2 rounded-md shadow-md">
                    <h1 className="text-2xl text-slate-700 font-semibold">You have already reviewed this product</h1>
                </div>
            ) : (
                <div>
                    <h1 className='text-2xl text-slate-700 font-semibold'>
                        Write a customer review
                    </h1>
                    <form onSubmit={createReviewHandler}>
                        <div className="flex flex-col justify-start items-star gap-3 mt-3">
                            <span className="text-md text-slate-500">
                                Choose rating from 1 to 5
                            </span>
                            <div className="flex items-center justify-start gap-1 text-lg">
                                {[...Array(5)].map((star, index) => {
                                    index += 1
                                    return (
                                        <button
                                            type='button'
                                            key={index}
                                            className={`${index <= (hover || rating) ? 'text-rose-600' : 'text-slate-400'
                                                }`}
                                            onClick={() => setRating(index)}
                                            onMouseEnter={() => setHover(index)}
                                            onMouseLeave={() => setHover(rating)}
                                            onDoubleClick={() => {
                                                setRating(0)
                                                setHover(0)
                                            }}
                                        >
                                            <FaStar />
                                        </button>
                                    )
                                })}
                            </div>
                            <Input
                                id='comment'
                                label='Comment'
                                onChange={(e) => setComment(e.target.value)}
                                value={comment}
                                required
                            />

                            <div className="max-w-[50%]">
                                <Button
                                    type='submit'
                                    buttonText={isLoading ? <LoadingButton /> : 'Submit'}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}

export default CreateProductReview