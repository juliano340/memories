import React from 'react'

export default function Footer() {

    function getDate() {   
        let date = new Date();
        return date.getFullYear();
     }

     let date = getDate();

  return (
   

    <footer>
        <p>Memories © {date} - Todos os direitos reservados.</p>
    </footer>
  )
}
