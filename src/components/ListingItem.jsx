import { Link } from "react-router-dom"
import {ReactComponent as DeleteIcon} from '../assets/svg/deleteIcon.svg'


function ListingItem({listing, id, onDelete}) {
  return (
    <li className="categoryListing">
        <Link to={`/category/${listing.type}/${id}`} className="categoryListingLink">
            <img src={listing.imgUrls[0]} alt={listing.name} className="categoryListingImg"/>
            <div className="categoryListingDetails">
                <p className="categoryListingLocation">
                    {listing.description}
                </p>
                <p className="categoryListingName">
                    {listing.name}
                </p>
                <p className="categoryListingPrice">
                    Total Time: {listing.total_time}
                </p>
            </div>
        </Link>

        {onDelete && (
            <DeleteIcon className="removeIcon" fill='rgb(231, 76, 60)' onClick={() => onDelete(listing.id, listing.name)} />
        )}
    </li>
  )
}

export default ListingItem