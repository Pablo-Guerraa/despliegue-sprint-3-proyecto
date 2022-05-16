import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import '../styles/card.css';

export default function Card({element, setOpenModal, setModalData }) {

  const pagTrailer = async() => {
    const pet = await fetch(`https://imdb-api.com/en/API/Trailer/k_1b36os8g/${element.id}`);
    const res = await pet.json();
    const trailerMovie = res.linkEmbed;
    window.open(trailerMovie, "nombre de la ventana", "width=850px, height=400")
  }
 
  return (
    <div className='card'>
      <img src={element.image} alt={element.title} />
      <div className={`calificacion ${ element.imDbRating < 7 ? 'menosValoradas' : 'masValoradas'}`}>
        <FontAwesomeIcon icon={faStar} />
        <span>{element.imDbRating !== null ? element.imDbRating : '0.0'}</span>
      </div>
      <div className='buttons-card'>
        <button onClick={pagTrailer}>Ver Trailer</button>
        <button onClick={()=>{
          setOpenModal(true);
          setModalData(element)
          }}>Mas Detalle</button>
      </div>
    </div>
  )
}