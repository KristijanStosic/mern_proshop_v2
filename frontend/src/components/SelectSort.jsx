import React from 'react'

const SelectSort = ({ sort, setSort }) => {

    return (
        <select
            onChange={(e) => setSort(e.target.value)}
            value={sort}
            className="cursor-pointer bg-gray-50 border border-gray-300 text-slate-700 text-sm rounded-md px-1 py-2"
            aria-label="Select sort"
        >
            <option value=''>Sort by</option>
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
        </select>
    )
}

export default SelectSort