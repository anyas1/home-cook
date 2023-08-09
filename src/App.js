import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Explore from "./pages/Explore";
import ForgotPassword from "./pages/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";
import Recipes from "./pages/Recipes";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Category from "./pages/Category";
import CreateListing from "./pages/CreateListing";
import Listing from "./pages/Listing";
import Contact from "./pages/Contact";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'



function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Explore />} />
        <Route path='/recipes' element={<Recipes />} />
        <Route path='/category/:categoryName' element={<Category />} />
       <Route path = '/profile' element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
       </Route>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/create-listing' element={<CreateListing />} />
        <Route path='/category/:categoryName/:listingId' element={<Listing />} />
        <Route path='/contact/:listerId' element={<Contact />} />
      </Routes>
      <Navbar />
    </Router>

    <ToastContainer />
    </>
  );
}

export default App;
