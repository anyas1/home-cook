import { Link } from "react-router-dom"
import {ReactComponent as DeleteIcon} from '../assets/svg/deleteIcon.svg'
import {ReactComponent as EditIcon} from '../assets/svg/editIcon.svg'


function ListingItem({listing, id, onEdit, onDelete}) {
  return (
    <li className="categoryListing">
        <Link to={`/category/${listing.type}/${id}`} className="categoryListingLink">
            <img src={listing.imgUrls[0]} alt={listing.name} className="categoryListingImg"/>
            <div className="categoryListingDetails">
                <p className="categoryListingName">
                    {listing.name}
                </p>
                <p className="categoryListingPrice">
                    Total Time: {listing.total_time}
                </p>
                <p className="categoryListingLocation">
                    {listing.description}
                </p>
            </div>
        </Link>

        {onDelete && (
            <DeleteIcon className="removeIcon" fill='rgb(231, 76, 60)' onClick={() => onDelete(listing.id, listing.name)} />
        )}

        {onEdit && <EditIcon className="editIcon" onClick={() => onEdit(id)} />}
    </li>
  )
}

export default ListingItem