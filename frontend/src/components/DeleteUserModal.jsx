import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import { useDeleteUserMutation } from '../slices/usersApiSlice'

const DeleteUserModal = ({ user, closeDeleteModal, refetch }) => {
    const [deleteUser] = useDeleteUserMutation()

    const deleteUserHandler = async (userId) => {
        try {
            await deleteUser(userId)
            closeDeleteModal()
            refetch()
            toast.success(`User ${user.firstName} ${user.lastName} is deleted`)
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-4 overflow-x-hidden overflow-y-auto">
            <div className="relative w-full max-w-md">
                <div className="relative bg-white rounded-lg shadow">
                    <button
                        type="button"
                        className="absolute top-3 right-2 text-slate-700 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:text-red-600"
                        onClick={closeDeleteModal}
                    >
                        <FaTimes size={20} />
                    </button>
                    <div className="p-6 text-center">
                        <h3 className="mb-5 text-lg font-normal text-slate-700 mt-5">
                            Are you sure you want to delete this user?
                        </h3>
                        <button
                            onClick={() => deleteUserHandler(user._id)}
                            type="button"
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 disabled:opacity-75"
                        >

                            Yes, I'm sure
                        </button>
                        <button
                            type="button"
                            className="text-slate-700 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                            onClick={closeDeleteModal}
                        >
                            No, cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteUserModal