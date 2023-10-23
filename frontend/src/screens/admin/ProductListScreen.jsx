import { Link, useParams } from "react-router-dom"
import { useGetProductsQuery } from "../../slices/productsApiSlice"
import { convertToNumber } from '../../utils/cartUtils'
import { FaEye, FaPen, FaTrash } from "react-icons/fa"
import Loader from "../../components/Loader"
import Container from "../../components/Container"
import PaginateProducts from '../../components/PaginateProducts'
import Message from "../../components/Message"

const ProductListScreen = () => {
    const { keyword, page } = useParams()

    const { data, isLoading, isFetching, error } = useGetProductsQuery({ keyword, page })

    return (
        <div className="p-8">
            <Container>
                {isLoading || isFetching ? (
                    <Loader />
                ) : error ? (
                    <Message>{error?.data?.message || error.error}</Message>
                ) : (
                    <>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg rounded-md">
                            <table className="w-full text-sm text-left text-slate-700">
                                <caption className="p-5 text-3xl font-semibold text-left text-slate-700 bg-white">
                                    Products
                                    <p className="mt-1 text-sm font-normal text-slate-500">
                                        Browse a list of ProShop products designed to help you work and play, stay organized, get answers, keep in touch, grow your business, and more.
                                    </p>
                                </caption>
                                <thead className="text-md text-slate-700 uppercase bg-slate-200">
                                    <tr>
                                        <th scope="col" className="text-left px-6 py-3">
                                            Product name
                                        </th>
                                        <th scope="col" className="text-center px-6 py-3">
                                            Stock
                                        </th>
                                        <th scope="col" className="text-center px-6 py-3">
                                            Category
                                        </th>
                                        <th scope="col" className="text-center px-6 py-3">
                                            Price
                                        </th>
                                        <th scope="col" className="text-end px-6 py-3">
                                            <span>Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                {data.products.map((product) => (
                                    <tr className="
                                    border-b-[1.5px] 
                                    border-slate-300
                                    bg-white 
                                    hover:bg-slate-200
                                    hover:cursor-pointer
                                    "
                                    >
                                        <th className="text-left px-6 py-4 font-medium text-slate-850 text-lg whitespace-nowrap">
                                            {product.name}
                                        </th>
                                        <td className="text-justify text-md px-6 py-4">
                                            {product.countInStock}
                                        </td>
                                        <td className="text-center text-md px-6 py-4">
                                            {product.category}
                                        </td>
                                        <td className="text-center text-md px-6 py-4">
                                            ${convertToNumber(product.price)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-3">
                                                <Link className="text-blue-500 hover:opacity-75" to={`/product/${product._id}`}>
                                                    <FaEye size={20} />
                                                </Link>
                                                <Link className="text-purple-500 hover:opacity-75" to={`/update-product/${product._id}`}>
                                                    <FaPen size={20} />
                                                </Link>
                                                <FaTrash className="text-rose-500 hover:opacity-75" size={20} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                        <div className="p-4">
                            <PaginateProducts 
                                page={data.page} 
                                pages={data.pages} 
                                isAdmin={true} 
                            />
                        </div>
                    </>
                )}
            </Container>
        </div>
    )
}

export default ProductListScreen