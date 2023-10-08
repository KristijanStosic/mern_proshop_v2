import React from 'react'
import { Form } from 'react-bootstrap'

const SelectSort = ({ sort, setSort }) => {

    return (
        <Form.Select
            onChange={(e) => setSort(e.target.value)}
            value={sort}
            className='me-2'
            style={{ cursor: 'pointer' }}
            aria-label="Default select example"
        >
            <option>Sort by</option>
            <option value='name'>Name A - Z</option>
            <option value='-name'>Name Z - A</option>
            <option value='price'>Price - Lowest first</option>
            <option value='-price'>Price - Highest first</option>
            <option value='createdAt'>Oldest</option>
            <option value='-createdAt'>Newest</option>
            <option value='rating'>Rating -  Lowest first</option>
            <option value='-rating'>Rating - Highest first</option>
            <option value='-numberOfReviews'>Most Reviews</option>
            <option value='numberOfReviews'>Least Reviews</option>
        </Form.Select>
    )
}

export default SelectSort