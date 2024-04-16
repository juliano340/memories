import React from 'react'
import { useState } from 'react'
import './AddMemory.css'
import axios from '../axios-config'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function AddMemory() {


  const [inputs, setInputs] = useState({})
  const [image, setImage] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', inputs.title)
    formData.append('description', inputs.description)
    formData.append('image', image)
    try {
      
        const response = await axios.post('http://localhost:3000/memories', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        toast.success(response.data.msg)
        navigate('/')
      
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.msg)

    }
  }

  const handleChange = (e) => {

    if (e.target.name === 'image') {
      setImage(e.target.files[0])
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value
      })
    }
  }

  return (
    <div className="add-memory-page">
      <h2>Adicionar Memória</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Título</p>
          <input type="text" name="title" id="" placeholder='Insira um título' onChange={handleChange} />
        </label>
        <label>
          <p>Descrição</p>
          <textarea name="description" placeholder='Descreva sua memória' onChange={handleChange}></textarea>
        </label>
        <label>
          <p>Foto</p>
          <input type="file" name="image" id="" placeholder='Insira um título' onChange={handleChange} />
        </label>
        <input className='btn' type="submit" value="Enviar" />
      </form>
    </div>
  )
}
