import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
        <h2>
            <Link to="/">Home</Link>
        </h2>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/add-memory">Adicionar Memória</Link>
            </li>
        </ul>

    </nav>
  )
}
