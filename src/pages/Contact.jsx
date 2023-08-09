import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"

function Contact() {
    const [message, setMessage] = useState('')
    const [lister, setLister] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()

    const params = useParams()
    
    useEffect(() => {
        const getLister = async () => {
            const docRef = doc(db, 'users', params.listerId)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()) {
                setLister(docSnap.data())
            } else {
                toast.error('Could not get lister data')
            }
        }

            getLister()
    }, [params.listerId])

    const onChange = (e) => setMessage(e.target.value)

  return (
    <div className="pageContainer">
        <header>
            <p className="pageHeader">Contact Lister</p>
        </header>

        {lister !== null && (
            <main>
                <div className="contactLandlord">
                    <p className="landlordName">Contact {lister?.name}</p>
                </div>

                <form className="messageForm">
                    <div className="messageDiv">
                        <label htmlFor="message" className="messageLabel">
                            Message
                        </label>
                        <textarea name="message" id="message" className="textarea" value={message} onChange={onChange}></textarea>
                    </div>

                    <a href={`mailto:${lister.email}?Subject=${searchParams.get('listingName')}&body=${message}`}>
                        <button type='button' className="primaryButton">Send Message</button>
                    </a>
                </form>
            </main>
        )}
    </div>
  )
}

export default Contact