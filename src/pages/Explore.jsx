import { Link } from "react-router-dom"
import apps from '../assets/jpg/apps.jpg'
import entres from '../assets/jpg/entres.jpg'
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
          </div>
        </main>
    </div>
  )
}

export default Explore