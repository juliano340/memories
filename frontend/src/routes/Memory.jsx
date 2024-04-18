import React from 'react'
import axios from '../axios-config'
import './Memory.css'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const Memory = () => {
    const {id} = useParams()
    const [memory, setMemory] = useState({})

    const [name, setName] = useState('')
    const [text, setText] = useState('')

    useEffect(() => {
        const getMemory = async () => {
            const res = await axios.get(`/memories/${id}`)
            setMemory(res.data.memory)
            setComment(res.data.memory.comments)
            
        }
        getMemory()
    }, [])

    if(!memory) return <div>Carregando...</div>

    const [comment, setComment] = useState([])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const comment = { name, text }
            const res = await axios.patch(`/memories/${id}/comments`, comment)
            const lastComment = res.data.memory.comments.pop()
            setComment((comments) => [...comments, lastComment])
            setName('')
            setText('')
            toast.success(res.data.msg)
            
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
        }
    }
    

  return (
    <div className='memory-page'>
        <img src={`${axios.defaults.baseURL}${memory.src}`} alt={memory.title} />
        <h2>{memory.title}</h2>
        <p>{memory.description}</p>
        <div className="comment-form">
            <h3>Adicionar um comentário</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Nome' onChange={(e) => setName(e.target.value)} value={name}/>
                <textarea name="" placeholder='Comentário' onChange={(e) => setText(e.target.value)} value={text}></textarea>
                <input type="submit" value="Enviar"  className='btn'/>
            </form>
        </div>
        <div className="comment-container">
            <h3>Comentários ({comment.length})</h3>
            {comment.length === 0 && <p>Nenhum comentário encontrado</p>}
            {comment.length > 0 && comment.map((comment) => (
                <div className="comment" key={comment._id}>
                    <p className="comment-name">{comment.name}</p>
                    <p className="comment-text">{comment.text}</p>
                </div>
                
            ))}
        </div>
    </div>
  )
}

export default Memory