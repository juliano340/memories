import React from 'react'
import { useState } from 'react'
import './AddMemory.css'

export default function AddMemory() {
  return (
    <div className="add-memory-page">
      <h2>Adicionar Memória</h2>
      <form>
        <label>
          <p>Título</p>
          <input type="text" name="title" id="" placeholder='Insira um título'/>
        </label>
        <label>
          <p>Descrição</p>
          <textarea name="description"  placeholder='Descreva sua memória'></textarea>
        </label>
        <label>
          <p>Foto</p>
          <input type="file" name="image" id="" placeholder='Insira um título'/>
        </label>
        <input className='btn' type="submit" value="Enviar" />
      </form>
    </div>
  )
}
