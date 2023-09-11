import { useState, useEffect, useRef } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { db } from "../firebase.config"
import { useNavigate, useParams } from "react-router-dom"
import { addDoc, collection, serverTimestamp, getDoc, doc, setDoc} from "firebase/firestore"
import { toast } from "react-toastify"

function FeedbackForm() {
    const [loading, setLoading] = useState(false)
    const [listing, setListing] = useState(null)
    const [formData, setFormData] = useState({
        rating: '',
        comment: '',
  })

  const {rating, comment} = formData

  const auth = getAuth()
  const navigate = useNavigate()
  const params = useParams()
  const isMounted = useRef(true)


const onMutate = (e) => {
    let boolean = null

    if(e.target.value === 'true') {
      boolean = true
    }
    if(e.target.value === 'false') {
      boolean = false
    }

      // Text/booleans/Numbers
      if(!e.target.files) {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.id]: boolean ?? e.target.value,
        }))
      }
    }

  useEffect(() => {
    if(isMounted) {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setFormData({...formData, userRef: user.uid})
            } else {
                navigate('/sign-in')
            }
        })
    }

    return () => {
        isMounted.current = false
    }
  }, [isMounted])


const onSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    if(comment.length < 10) {
    setLoading(false)
    toast.error('Minimum of 10 characters')
    return
    }


    const formDataCopy = {
        ...formData,
        timestamp: serverTimestamp(),
        listingId: listing.uid,
    }


    // Save to db
    const docRef = await addDoc(collection(db, 'feedback'), formDataCopy)
        setLoading(false)
        toast.success('Comment posted')
}


  return (
    <div className="feedbackTable">
        <div className="comment">Comment</div>
        <textarea className='feedbackInputText'
            type='text'
            id='comment'
            value={comment}
            onChange={onMutate}
            maxLength='500'
            minLength='10'
            required ></textarea>
        <button className='primaryButton createFeedbackButton' onClick={onSubmit} type="submit">Add Comment</button>
    </div>

  )
}

export default FeedbackForm