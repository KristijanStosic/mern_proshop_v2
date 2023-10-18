import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'
import Container from './Container'
import FooterList from './FooterList'

const Footer = () => {
  return (
    <footer className='bg-slate-700 text-slate-200 text-sm mt-16'>
      <div className='px-8'>
        <Container>
          <div className='flex flex-col md:flex-row justify-between pt-16 pb-8'>
            <FooterList>
              <h3 className='text-base font-bold mb-2'>Shop Categories</h3>
              <Link href='#'>Phones</Link>
              <Link href='#'>Laptops</Link>
              <Link href='#'>Desktops</Link>
              <Link href='#'>Watches</Link>
              <Link href='#'>TVs</Link>
              <Link href='#'>Accessories</Link>
            </FooterList>
            <FooterList>
              <h3 className='text-base font-bold mb-2'>Customer Service</h3>
              <Link href='#'>Contact Us</Link>
              <Link href='#'>Shipping Policy</Link>
              <Link href='#'>Returns & Exchanges</Link>
              <Link href='#'>FAQs</Link>
            </FooterList>
            <div className='w-full md:w-1/3 mb-6 md:mb-0'>
              <h3 className='text-base font-bold mb-2'>About Us</h3>
              <p className='mb-2 text-justify'>
                At our electronics store, we are dedicated to providing the latest
                and greatest devices and accessories to our customers. With a wide
                selection of phones, TVs, laptops, watches and accessories.
              </p>
            </div>
            <FooterList>
              <h3 className='text-base font-bold mb-2'>Follow Us</h3>
              <div className='flex gap-2'>
                <Link href='#'>
                  <FaFacebook size={24} />
                </Link>
                <Link href='#'>
                  <FaTwitter size={24} />
                </Link>
                <Link href='#'>
                  <FaInstagram size={24} />
                </Link>
                <Link href='#'>
                  <FaYoutube size={24} />
                </Link>
              </div>
            </FooterList>
          </div>
        </Container>
      </div>
      <div className='bg-slate-500 p-4 text-slate-50'>
          <div className='flex flex-center justify-center'>
            <p>&copy; {new Date().getFullYear()} ProShop. All rights reserved</p>
          </div>
        </div>
    </footer>
  )
}

export default Footer
