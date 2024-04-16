import React from 'react'
import './Footer.css'

export default function Footer() {

    function getDate() {   
        let date = new Date();
        return date.getFullYear();
     }

     let date = getDate();

  return (
   

    <footer className='footer'>
        <p>Memories © {date} - Todos os direitos reservados.</p>
    </footer>
  )
}
