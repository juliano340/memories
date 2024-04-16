import React from 'react'
import { useState } from 'react'
import './AddMemory.css'
import axios from '../axios-config'

export default function AddMemory() {


  const [inputs, setInputs] = useState({})
  const [image, setImage] = useState(null)

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
      
    } catch (error) {
      console.log(error)

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
