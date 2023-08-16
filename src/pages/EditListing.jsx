import { useState, useEffect, useRef } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { db } from "../firebase.config"
import { useNavigate, useParams } from "react-router-dom"
import { updateDoc, doc, getDoc, serverTimestamp } from "firebase/firestore"
import { toast } from "react-toastify"
import {v4 as uuidv4} from 'uuid'
import Spinner from "../components/Spinner"

function EditListings() {
  const [loading, setLoading] = useState(false)
  const [listing, setListing] = useState(false)
  const [formData, setFormData] = useState({
    type: 'appetizers',
    name: '',
    description: '',
    prep_time: '15 minutes',
    cook_time: '20 minutes',
    total_time: '35 minutes',
    ingredients: '',
    instructions: '',
    comments: '',
    images: {}
  })

  const {type, name, description, prep_time, cook_time, total_time, ingredients, instructions, comments, images} = formData

  const auth = getAuth()
  const navigate = useNavigate()
  const params = useParams()
  const isMounted = useRef(true)

//   Redirect if listing is not user's
useEffect(() => {
    if(listing && listing.userRef !== auth.currentUser.uid) {
        toast.error('You cannot edit this recipe')
        navigate('/')
    }
})


//   Fetch Listing to edit
  useEffect(() => {
    setLoading(true)
    const fetchListing = async () => {
        const docRef = doc(db, 'listings', params.listingId)
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()) {
            setListing(docSnap.data())
            setFormData({...docSnap.data() })
            setLoading(false)
        } else {
            navigate('/')
            toast.error('Listing does not exist')
        }
    }
    fetchListing()
  }, [params.listingId, navigate])

//  Sets userREf to logged in user
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
    // eslint-disable-next-line
  }, [isMounted])

  const onSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    if(images.length > 6) {
      setLoading(false)
      toast.error('Max 6 Images')
      return
    }

    const storeImage = async (image) => {
      return new Promise((resolve, reject) =>{
        const storage = getStorage()
        const fileName = `${auth.currentUser.uid}=${image.name}-${uuidv4()}`

        const storageRef = ref(storage, 'images/' + fileName)

        const uploadTask = uploadBytesResumable(storageRef, image)

        uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    // eslint-disable-next-line default-case
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    reject(error)
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      resolve(downloadURL);
    });
  }
);
      })
    }

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false)
      toast.error('Images could not be uploaded')
      return
    })

    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp()
    }

    delete formDataCopy.images

    // Update Listing
    const docRef = doc(db, 'listings', params.listingId)
    await updateDoc(docRef, formDataCopy)
    setLoading(false)
    toast.success('Recipe Saved')
    navigate(`/category/${formDataCopy.type}/${docRef.id}`)
  }

  const onMutate = (e) => {
    let boolean = null

    if(e.target.value === 'true') {
      boolean = true
    }
    if(e.target.value === 'false') {
      boolean = false
    }
      // Files
      if(e.target.files) {
        setFormData((prevState) => ({
          ...prevState,
          images: e.target.files,
        }))
      }

      // Text/booleans/Numbers
      if(!e.target.files) {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.id]: boolean ?? e.target.value,
        }))
      }
    }

  if(loading) {
    return <Spinner />
  }
  return (
    <div className="profile">
      <header>
        <p className="pageHeader">Edit your recipe</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <label className="formLabel">Type</label>
          <div className="formButtons">
            <button
            type='button'
            className={type === 'appetizers' ? 'formButtonActive' : 'formButton'}
            id='type'
            value='appetizers'
            onClick={onMutate}>
              Appetizer
            </button>
            <button
            type='button'
            className={type === 'entrees' ? 'formButtonActive' : 'formButton'}
            id='type'
            value='entrees'
            onClick={onMutate}>
              Entree
            </button>
            <button
            type='button'
            className={type === 'sides' ? 'formButtonActive' : 'formButton'}
            id='type'
            value='sides'
            onClick={onMutate}>
              Sides
            </button>
            <button
            type='button'
            className={type === 'dessert' ? 'formButtonActive' : 'formButton'}
            id='type'
            value='dessert'
            onClick={onMutate}>
              Dessert
            </button>
            <button
            type='button'
            className={type === 'sides' ? 'formButtonActive' : 'formButton'}
            id='type'
            value='sides'
            onClick={onMutate}>
              Sides
            </button>
            <button
            type='button'
            className={type === 'drinks' ? 'formButtonActive' : 'formButton'}
            id='type'
            value='drinks'
            onClick={onMutate}>
              Drinks
            </button>
          </div>
          <label className='formLabel'>Name</label>
          <input
            className='formInputName'
            type='text'
            id='name'
            value={name}
            onChange={onMutate}
            maxLength='50'
            minLength='5'
            required
          />
          <label className='formLabel'>Description</label>
          <textarea
            className='formInputName'
            type='text'
            id='description'
            value={description}
            onChange={onMutate}
            maxLength='250'
            minLength='10'
            required
          />
          <label className='formLabel'>Prep Time</label>
          <input
            className='formInputName'
            type='text'
            id='prep_time'
            value={prep_time}
            onChange={onMutate}
            maxLength='32'
            minLength='10'
            required
          />
          
          <label className='formLabel'>Cook Time</label>
          <input
            className='formInputName'
            type='text'
            id='cook_time'
            value={cook_time}
            onChange={onMutate}
            maxLength='32'
            minLength='10'
            required
          />
          <label className='formLabel'>Total Time</label>
          <input
            className='formInputName'
            type='text'
            id='total_time'
            value={total_time}
            onChange={onMutate}
            maxLength='32'
            minLength='10'
            required
          />
          <label className='formLabel'>Ingredients</label>
          <textarea
            className='formInputName'
            type='text'
            id='ingredients'
            value={ingredients}
            onChange={onMutate}
            maxLength='500'
            minLength='10'
            required
          />
          <label className='formLabel'>Instructions</label>
          <textarea
            className='formInputName'
            type='text'
            id='instructions'
            value={instructions}
            onChange={onMutate}
            maxLength='5000'
            minLength='10'
            required
          />
          <label className='formLabel'>Additional Comments</label>
          <textarea
            className='formInputName'
            type='text'
            id='comments'
            value={comments}
            onChange={onMutate}
            maxLength='5000'
            minLength='10'
          />
          <label className='formLabel'>Images</label>
          <p className='imagesInfo'>
            The first image will be the cover (max 6).
          </p>
          <input
            className='formInputFile'
            type='file'
            id='images'
            onChange={onMutate}
            max='6'
            accept='.jpg,.png,.jpeg'
            multiple
            required
          />
          <button type='submit' className='primaryButton createListingButton'>
            Save Changes
          </button>
        </form>
      </main>
    </div>
  )
}

export default EditListings