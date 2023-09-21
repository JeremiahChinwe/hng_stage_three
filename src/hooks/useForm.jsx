import { useState } from 'react'

export default function useForm(initState) {
    const [values, setValues] = useState(initState)

    const handleChange = (event) => {
        const { name, value } = event.target
        setValues({ ...values, [name]: value})
    }

    const resetForm = () => {
        setValues(initState)
    }

  return [ values, handleChange, resetForm]
}

