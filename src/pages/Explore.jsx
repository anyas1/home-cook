import { Link } from "react-router-dom"
import apps from '../assets/jpg/apps.jpg'
import entres from '../assets/jpg/entres.jpg'
import dessert from '../assets/jpg/dessert.jpg'
import drink from '../assets/jpg/drink.jpg'
import snack from '../assets/jpg/snack.jpg'
import side from '../assets/jpg/side.jpg'
import Slider from "../components/Slider"

function Explore() {
  return (
    <div className="explore">
        <header className='pageHeader'>
          <p>
            Explore
          </p>
        </header>

        <main>
          <Slider />

          <p className="exploreCategoryHeading">Categories</p>
          <div className="exploreCategories">
            <Link to='/category/appetizers'>
              <img src={apps} alt="appetizers" className="exploreCategoryImg"/>
              <p className="exploreCategoryName">Appetizers</p>
            </Link>
            <Link to='/category/entrees'>
              <img src={entres} alt="entrees" className="exploreCategoryImg"/>
              <p className="exploreCategoryName">Entrees</p>
            </Link>
            <Link to='/category/desserts'>
              <img src={dessert} alt="dessert" className="exploreCategoryImg"/>
              <p className="exploreCategoryName">Desserts</p>
            </Link>
            <Link to='/category/sides'>
              <img src={side} alt="side" className="exploreCategoryImg"/>
              <p className="exploreCategoryName">Side Dishes</p>
            </Link>
            <Link to='/category/drinks'>
              <img src={drink} alt="drink" className="exploreCategoryImg"/>
              <p className="exploreCategoryName">Drinks</p>
            </Link>
            <Link to='/category/snacks'>
              <img src={snack} alt="snack" className="exploreCategoryImg"/>
              <p className="exploreCategoryName">Snacks</p>
            </Link>
            </div>
        </main>
    </div>
  )
}

export default Explore