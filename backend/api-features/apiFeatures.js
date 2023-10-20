class APIFeatures {
    constructor(query, queryStr) {
        this.query = query
        this.queryStr = queryStr
    }
    
    search() {
        const keyword = this.queryStr.keyword
        const searchCriteria = []

        /*const searchCriteria = {}

        if (keyword) {
        searchCriteria.$or = [
                { name: { $regex: keyword, $options: 'i' } },
                { brand: { $regex: keyword, $options: 'i' } },
                { category: { $regex: keyword, $options: 'i' } },
                { model: { $regex: keyword, $options: 'i' } }
            ]
        }*/

        if (keyword) {
            searchCriteria.push({
                name: {
                    $regex: keyword,
                    $options: 'i',
                },
            })
            
            searchCriteria.push({
                brand: {
                    $regex: keyword,
                    $options: 'i',
                },
            })

            searchCriteria.push({
                category: {
                    $regex: keyword,
                    $options: 'i',
                },
            })

            searchCriteria.push({
                model: {
                    $regex: keyword,
                    $options: 'i',
                },
            })
        }
    
        if (searchCriteria.length > 0) {
            this.query = this.query.find({ $or: searchCriteria })
        }

        return this

        /*this.query = this.query.find({ ...searchCriteria })
        return this*/
    }

    filter() {
        const queryCopy = { ...this.queryStr }

        // Removing fields from the query
        const removeFields = ['keyword', 'limit', 'page', 'sort']
        removeFields.forEach((el) => delete queryCopy[el])

        // Advance filter for price, ratings
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`)

        this.query = this.query.find(JSON.parse(queryStr))
        return this
    }

    pagination(pageSize, page) {
        this.query = this.query.limit(pageSize).skip(pageSize * (page - 1))
        return this
    }

    sort() {
        if (this.queryStr.sort) {
            const sortBy = this.queryStr.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }

        return this
    }
}

export default APIFeatures