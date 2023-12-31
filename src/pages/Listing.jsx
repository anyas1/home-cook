import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { getDoc, doc } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { db } from "../firebase.config"
import Spinner from "../components/Spinner"
import shareIcon from '../assets/svg/shareIcon.svg'
import {v4 as uuidv4} from 'uuid'

function Listing() {
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [shareLinkCopied, setShareLinkCopied] = useState(false)

    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()

    useEffect(() => {
        const fetchListing = async () => {
            const docRef = doc(db, 'listings', params.listingId)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()) {
                console.log(docSnap.data())
                setListing(docSnap.data())
                setLoading(false)
            }
        }
        fetchListing()
    },[navigate, params.listingId])

    if(loading) {
        return <Spinner />
    }

return (
    <div>
    <header className="listingHeader">
    </header>
    <main>
        <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]} slidesPerView={1} pagination={{clickable: true}} navigation style={{ height: '300px' }}>
            {listing.imgUrls.map((url, index) => {
            return ( <SwiperSlide key={index}>
                    <div style={{background: `url(${listing.imgUrls[index]}) center no-repeat`, backgroundSize: 'cover'}} className="swiperSlideDiv">
                    </div>
                </SwiperSlide>
            )
})}
        </Swiper>

        <div className="shareIconDiv" onClick={() => {
            navigator.clipboard.writeText(window.location.href)
            setShareLinkCopied(true)
            setTimeout(() => {
                setShareLinkCopied(false)
            }, 2000)
        }}>
            <img src={shareIcon} alt="shareicon" />
        </div>

        {shareLinkCopied && <p className="linkCopied">Link Copied</p>}

        <div className="listingDetails">
            <p className="listingName">
                {listing.name} - {listing.total_time}
            </p>
            <p className="listingLocation">
                <em>{listing.description}</em>
            </p>
            <p className="listingType">
                {listing.type.charAt(0).toUpperCase() +
                    listing.type.slice(1)}
            </p>
            <p>
                Prep Time: {listing.prep_time}
            </p>
            <p>
                Cook Time: {listing.cook_time}
            </p>
            <p>
            <b>Ingredients:</b>
            </p>
            <ul>{listing.ingredients.split(', ').map(str => <p key={uuidv4()}> • {str}</p>)}</ul>
            <p>
               <b>Instructions:</b>
            </p>
            <ul>{listing.instructions}</ul>
            <p>
               <b>Additional Comments:</b>
            </p>
            <ul>{listing.comments}</ul>
            <br />
            <br />
            {auth.currentUser?.uid !== listing.userRef && (
                <Link to={`/contact/${listing.userRef}?listingName=${listing.name}`} className="primaryButton">
                    Contact Poster
                </Link>
            )}
        </div>
    </main>
    </div>
  )
}

export default Listing