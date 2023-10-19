import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
    const navigate = useNavigate()
    const { keyword: urlKeyword } = useParams()

    const [keyword, setKeyword] = useState(urlKeyword || '')

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            navigate(`/search/${keyword.trim()}`)
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
                    placeholder='Search Products...'
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