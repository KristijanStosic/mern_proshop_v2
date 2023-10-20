import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, isAdmin = false, keyword = '', type }) => {
    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x) => (
                    <LinkContainer
                        key={x + 1}
                        to={isAdmin && type === 'users' ? (
                                `/admin/all-users/${x + 1}`
                            ) : (!isAdmin ? keyword
                                ? `/search/${keyword}/page/${x + 1}`
                                : `/page/${x + 1}`
                            : `/admin/all-products/${x + 1}`)
                        }
                    >
                        <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )
    )
}

export default Paginate