import { useState } from 'react'
import { Link, useParams } from "react-router-dom"
import { useGetOrdersQuery } from "../../slices/ordersApiSlice"
import { FaCheck, FaEye, FaPen, FaTimes, FaTrash, FaTruck } from "react-icons/fa"
import { MdDeliveryDining } from "react-icons/md";
import Loader from "../../components/Loader"
import Container from "../../components/Container"
import Message from "../../components/Message"
import GoBackButton from "../../components/GoBackButton"
import DeleteOrderModal from '../../components/DeleteOrderModal'
import Backdrop from '../../components/Backdrop'
import moment from 'moment'
import OrderStatus from '../../components/OrderStatus'
import Button from '../../components/Button'

const OrderListScreen = () => {
    const [orderData, setOrderData] = useState(null)
    const [openModal, setOpenModal] = useState(false)

    const openDeleteModal = (data) => {
        setOrderData(data)
        setOpenModal(true)
    }

    const closeDeleteModal = () => {
        setOpenModal(false)
        setOrderData(null)
    }

    const { data: orders, isLoading, error, refetch } = useGetOrdersQuery()

    return (
        <>
            <div className="p-8">

                <Container>

                    <div className="max-w-[100px] pb-3">
                        <GoBackButton />
                    </div>

                    {isLoading ? (
                        <Loader />
                    ) : error ? (
                        <Message>{error?.data?.message || error.error}</Message>
                    ) : (
                        <>
                            <div className="flex items-center justify-start bg-slate-200 px-5 py-3 rounded">
                                <h1 className="text-3xl font-semibold text-slate-700 uppercase">
                                    Orders
                                </h1>
                            </div>

                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg rounded-md">

                                <table className="w-full text-sm text-slate-700 mt-3">

                                    <thead className="text-md text-slate-200 uppercase bg-slate-800">

                                        <tr>
                                            <th scope="col" className="text-left px-6 py-3">
                                                Id
                                            </th>
                                            <th scope="col" className="text-center px-6 py-3">
                                                User
                                            </th>
                                            <th scope="col" className="text-center px-6 py-3">
                                                Date
                                            </th>
                                            <th scope="col" className="text-center px-6 py-3">
                                                Paid
                                            </th>
                                            <th scope="col" className="text-center px-6 py-3">
                                                Dispatched
                                            </th>
                                            <th scope="col" className="text-center px-6 py-3">
                                                Delivered
                                            </th>
                                            <th scope="col" className="text-center px-6 py-3">
                                                Total
                                            </th>
                                            <th scope="col" className="text-end px-6 py-3">
                                                <span>Actions</span>
                                            </th>
                                        </tr>

                                    </thead>

                                    <tbody>
                                        {orders.map((order) => (
                                            <tr key={order._id}
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
                                                        text-md 
                                                        whitespace-nowrap
                                                "
                                                >
                                                    {order._id}
                                                </td>

                                                <td className="text-center text-md px-6 
                                                py-4">
                                                    {order.user.firstName} {order.user.lastName}
                                                </td>

                                                <td className="text-center text-md px-6 
                                                py-4">
                                                    {moment(order.createdAt).format('DD/MM/YYYY')}
                                                </td>

                                                <td className="text-md px-6 
                                                py-4">
                                                    <OrderStatus orderStatus={order.isPaid} />
                                                </td>

                                                <td className="text-md px-6 
                                                py-4">
                                                    <OrderStatus orderStatus={order.isDispatched} />
                                                </td>

                                                <td className="text-md px-6 
                                                py-4">
                                                    <OrderStatus orderStatus={order.isDelivered} />
                                                </td>

                                                <td className="text-md px-6 
                                                py-4 font-medium">
                                                    ${order.totalPrice}
                                                </td>

                                                <td className="px-6 py-4">

                                                    <div className="flex items-center justify-end gap-3">

                                                        <Link
                                                            className="text-blue-600 hover:opacity-75"
                                                            to={`/order/${order._id}`}
                                                        >
                                                            <FaEye size={20} />
                                                        </Link>
                                                        <Link
                                                            className="text-purple-800 hover:opacity-75"
                                                        >
                                                            <MdDeliveryDining size={20} /> 
                                                        </Link>

                                                        <FaTruck className="text-yellow-600 hover:opacity-75" size={20} />

                                                        <FaTimes onClick={() => openDeleteModal(order)} className="text-rose-600 hover:opacity-75" size={20} />
                                                    </div>

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                        </>
                    )}
                </Container>
            </div>
            {openModal &&
                <DeleteOrderModal
                    refetch={refetch}
                    order={orderData}
                    closeDeleteModal={closeDeleteModal}
                />}
            {openModal && <Backdrop onClick={closeDeleteModal} />}
        </>
    )
}

export default OrderListScreen