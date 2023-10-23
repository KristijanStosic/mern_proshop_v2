import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const SearchBox = ({ placeholder, isAdmin = false, searchType }) => {
    const navigate = useNavigate()
    const { keyword: urlKeyword } = useParams()

    const [keyword, setKeyword] = useState(urlKeyword || '')

    const submitHandler = (e) => {
        e.preventDefault()

        if (keyword) {
            if (searchType === 'products') {
                navigate(`/search/${keyword.trim()}`)
            } else if (isAdmin && searchType === 'admin-products') {
                navigate(`/admin/search-products/${keyword.trim()}`)
            } else if (searchType === 'users' && isAdmin) {
                navigate(`/admin/search-users/${keyword.trim()}`)
            } else {
                navigate('/')
            }
            setKeyword('')
        } else {
            navigate('/')
        }
    }

    return (
        <div >
            <form onSubmit={submitHandler} className='flex items-center justify-center'>
                <input
                    autoComplete='off'
                    type='text'
                    name='q'
                    onChange={(e) => setKeyword(e.target.value)}
                    value={keyword}
                    placeholder={placeholder}
                    className='p-2 border-gray-300 rounded-l-md focus:outline-none focus:border-[0.5px] focus:border-slate-500 w-80'
                />
                <button type="button" className="p-3 rounded-r-lg font-medium text-center inline-flex items-center text-white bg-slate-700 hover:opacity-75 focus:ring-4 focus:outline-none">
                    <FaSearch />
                </button>
            </form>
        </div>
    )
}

export default SearchBox