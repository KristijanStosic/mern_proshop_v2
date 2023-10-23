import { Link } from 'react-router-dom'
import Container from './Container'
import SearchBox from './SearchBox'
import CartHeaderCount from './CartHeaderCount'
import UserHeaderMenu from './UserHeaderMenu'

const Header = () => {
    
    return (
        <div className='sticky top-0 w-full bg-slate-200 z-30 shadow-sm text-slate-700'>
            <div className='px-8 py-4 border-b-slate-700'>
                <Container>
                    <div className='flex items-center justify-between gap-3 md:gap-0'>
                        <Link to='/' style={{ fontFamily: 'Redressed' }} className='font-bold text-3xl'>ProShop</Link>
                        <div className='hidden md:block'>
                            <SearchBox searchType='products' placeholder='Search products...' />
                        </div>
                        <div className='flex items-center gap-8 md:gap-12'>
                            <CartHeaderCount />
                            <UserHeaderMenu />
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Header