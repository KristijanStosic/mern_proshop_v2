import { Link, useParams } from "react-router-dom"
import { useGetUsersQuery } from "../../slices/usersApiSlice"
import { FaCheck, FaEye, FaPen, FaTimes, FaTrash } from "react-icons/fa"
import Loader from "../../components/Loader"
import SearchBox from "../../components/SearchBox"
import Container from "../../components/Container"
import PaginateUsers from '../../components/PaginateUsers'
import Message from "../../components/Message"
import GoBackButton from "../../components/GoBackButton"

const UserListScreen = () => {
    const { keyword, page } = useParams()

    const { data, isLoading, isFetching, error } = useGetUsersQuery({ keyword, page })

    return (
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
                                Users
                            </h1>
                            <SearchBox searchType='users' placeholder='Search Users...' isAdmin={true} />
                        </div>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg rounded-md">
                            <table className="w-full text-sm text-slate-700 mt-3">
                                <thead className="text-md text-slate-200 uppercase bg-slate-800">
                                    <tr>
                                        <th scope="col" className="text-left px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="text-center px-6 py-3">
                                            Email
                                        </th>
                                        <th scope="col" className="text-center px-6 py-3">
                                            Admin
                                        </th>
                                        <th scope="col" className="text-end px-6 py-3">
                                            <span>Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.users.map((user) => (
                                        <tr key={user._id} className="
                                            border-b-[1.5px] 
                                            border-slate-300
                                            bg-white 
                                            hover:bg-slate-200
                                            hover:cursor-pointer
                                            "
                                        >
                                            <td className="text-left px-6 py-4 font-medium text-slate-850 text-lg whitespace-nowrap">
                                                {user.name}
                                            </td>
                                            <td className="text-center text-md">
                                                {user.email}
                                            </td>
                                            <td className="text-center text-md">
                                                <div className="flex items-center justify-center">
                                                    {user.isAdmin ? (
                                                        <FaCheck className="text-green-500" />
                                                    ) : (
                                                        <FaTimes className="text-rose-500" />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-3">
                                                    <Link className="text-blue-600 hover:opacity-75" to={`/admin/user/${user._id}`}>
                                                        <FaEye size={20} />
                                                    </Link>
                                                    <Link className="text-slate-800 hover:opacity-75" to={`/update-user/${user._id}`}>
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
                            <PaginateUsers
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

export default UserListScreen