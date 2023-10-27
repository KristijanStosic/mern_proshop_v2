import { Link, useParams } from "react-router-dom"
import { useGetProductsQuery } from "../../slices/productsApiSlice"
import { convertToNumber } from '../../utils/cartUtils'
import { FaEye, FaPen, FaPlus, FaTrash } from "react-icons/fa"
import Loader from "../../components/Loader"
import Container from "../../components/Container"
import PaginateProducts from '../../components/PaginateProducts'
import Message from "../../components/Message"
import GoBackButton from "../../components/GoBackButton"
import SearchBox from "../../components/SearchBox"
import Button from "../../components/Button"

const ProductListScreen = () => {
    const { keyword, page } = useParams()

    const { data, isLoading, isFetching, error } = useGetProductsQuery({ keyword, page })

    return (
        <>
            <div className="p-8">

                <Container>

                    <div className="max-w-[100px] pb-3">
                        {keyword && <GoBackButton />}
                    </div>
                    
                    {isLoading || isFetching ? (
                        <Loader />
                    ) : error ? (
                        <Message>{error?.data?.message || error.error}</Message>
                    ) : (
                        <>
                            <div className="flex items-center justify-between bg-slate-200 px-5 py-3 rounded">

                                <h1 className="text-3xl font-semibold text-slate-700 uppercase">
                                    Products
                                </h1>

                                <div className="flex items-center justify-end gap-3">
                                    <SearchBox isAdmin={true} searchType='admin-products' placeholder='Search Products...' />
                                    <Link to='/admin/create-product'>
                                        <Button buttonText='New Product' icon={<FaPlus />} />
                                    </Link>
                                </div>

                            </div>

                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg rounded-sm">

                                <table className="w-full text-sm text-slate-700 mt-3">

                                    <thead className="text-md text-slate-100 uppercase bg-slate-800">

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

                                    <tbody>
                                        {data.products.map((product) => (
                                            <tr key={product._id}
                                            className="
                                                border-b-[1.5px] 
                                              border-slate-300
                                              bg-white 
                                              hover:bg-slate-200
                                                hover:cursor-pointer
                                            "
                                            >
                                                <td 
                                                className="
                                                    text-left 
                                                    px-6 
                                                    py-4 
                                                    font-medium 
                                                    text-slate-850 
                                                    text-lg 
                                                    whitespace-nowrap
                                                "
                                                >
                                                    {product.name}
                                                </td>

                                                <td className="text-center text-md">
                                                    {product.countInStock}
                                                </td>

                                                <td className="text-center text-md">
                                                    {product.category}
                                                </td>

                                                <td className="text-center font-medium text-md">
                                                    ${convertToNumber(product.price)}
                                                </td>

                                                <td className="px-6 py-4">

                                                    <div className="flex items-center justify-end gap-3">

                                                        <Link 
                                                            className="text-blue-600 hover:opacity-75" 
                                                            to={`/product/${product._id}`}
                                                        >
                                                            <FaEye size={20} />
                                                        </Link>

                                                        <Link 
                                                            className="text-slate-800 hover:opacity-75" 
                                                            to={`/update-product/${product._id}`}
                                                        >
                                                            <FaPen size={20} />
                                                        </Link>

                                                        <FaTrash className="text-rose-600 hover:opacity-75" size={20} />
                                                    </div>

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

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
        </>
    )
}

export default ProductListScreen