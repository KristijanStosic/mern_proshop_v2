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
        <Form onSubmit={submitHandler} 
            className='d-flex justify-content-center align-items-center ms-auto'>
            <InputGroup style={{ cursor: 'pointer' }}>
                <Form.Control
                    type='text'
                    name='q'
                    onChange={(e) => setKeyword(e.target.value)}
                    value={keyword}
                    placeholder='Search Products...'
                    className='mr-sm-2 ml-sm-5 form-control'
                    style={{ width: '300px'}}
                />
                <InputGroup.Text className='bg-light' >
                    <button 
                        style={{ border: 'none', background: 'none' }} 
                        type='submit'><FaSearch color='#2D3748' />
                    </button>
                </InputGroup.Text>
            </InputGroup>
        </Form>
    )
}

export default SearchBox