import { useNavigate, useLocation } from "react-router-dom"
import logo from '../assets/jpg/logo.jpg'


function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()

    const pathMatchRoute = (route) => {
        if(route === location.pathname) {
            return true
        }
    }

return (
    <header className="navbar">
        <nav className="navbarNav">
            <ul className="navbarListItems">
                <li className="navbarListItemHome" onClick={() => navigate('/')}>
                    <p className={pathMatchRoute('/') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Home</p>
                </li>
                <li className="navbarListItemExplore" onClick={() => navigate('/explore')}>
                    <p className={pathMatchRoute('/explore') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Explore</p>
                </li>
                <li  className="navbarListItemLogo" onClick={() => navigate('/')}>
                <img src={logo} alt="logo" className="navBarLogo"/>
                </li>
                <li className="navbarListItemProfile" onClick={() => navigate('/profile')}>
                    <p className={pathMatchRoute('/profile') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Profile</p>
                </li>
            </ul>
        </nav>
    </header>
)
}

export default Navbar