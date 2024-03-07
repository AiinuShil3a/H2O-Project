import Banner from '../../components/Banner'
import Categories from '../Home/Categories'
import SpecialProduct from '../Home/SpecialProduct'
import Testimonials from '../home/Testimonials'
import OurService from '../home/OurServices'
import ProductList from '../shop/product_list'

const Home = () => {
  return (
    <div>
        <Banner/>
        <Categories/>
        <SpecialProduct/>
        <Testimonials/>
        <OurService/>
        <ProductList/>
    </div>
  )
}

export default Home