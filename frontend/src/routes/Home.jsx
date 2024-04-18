import React from 'react'
import axios from '../axios-config'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'


const Home = () => {

  const [memories, setMemories] = useState([])


  useEffect(() => {
    const getMemories = async () => {
      try {
        const response = await axios.get('/memories')
        setMemories(response.data.memories);  // Correção aqui
        console.log(response.data.memories);  // Log corrigido para mostrar os dados corretos
      } catch (error) {
        console.error("Erro ao buscar memórias:", error);
      }

    }

    getMemories()

  }, [])

  return (

    <div className='home'>
      <h2>Últimas memórias</h2>
      <div className="memories-container">
        {memories.length === 0 && <h2>Nenhuma memória encontrada.<br/><br/> <a  className="btn" href="/add-memory">Criar memória</a>  </h2>}
        {memories.length > 0 && memories.map((memory) =>

          <div className='memory' key={memory._id}>

            <Link to={`/memory/${memory._id}`}>
              <img src={`${axios.defaults.baseURL}${memory.src}`} alt={memory.title} />
            </Link>

            <p>{memory.title}</p>
            <Link className='btn' to={`/memory/${memory._id}`}>Comentar</Link>
          </div>

        )}
      </div>
    </div>

  )
}

export default Home;