import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    const fetchFeedback = async () => {
        const response = await fetch('/feedback?_sort=id&order=desc')
        const data = await response.json()

        setFeedback(data)
        setIsLoading(false)

    }

    useEffect(() => {
        fetchFeedback()
    }, [])
}
