import { useState } from 'react'

function useForm(initialValues) {
  const [formData, setFormData] = useState(initialValues)

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }

  const handleReset = () => {
    setFormData(initialValues)
  }

  return { formData, handleInputChange, handleReset }
}

export default useForm
