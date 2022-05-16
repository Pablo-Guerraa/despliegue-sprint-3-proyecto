import React from 'react'
import { Modal } from '@mui/material'
import { Box } from '@mui/system'
import '../styles/modal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleRight, faStar } from '@fortawesome/free-solid-svg-icons'
import '../styles/card.css';


export default function ModalDetail({ modalData, openModal, setOpenModal }) {

  const pagTrailer = async() => {
    const pet = await fetch(`https://imdb-api.com/en/API/Trailer/k_1b36os8g/${modalData.id}`);
    const res = await pet.json();
    const trailerMovie = res.linkEmbed;
    window.open(trailerMovie, "nombre de la ventana", "width=850px, height=400")
  }

  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '800px',
        background: 'transparent',
        transform: 'translate(-50%, -50%)',
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
      }}>

        <div className='card card-modal'>
          <img src={modalData?.image} alt={modalData?.title} />
          <div className={`calificacion calificacion-modal ${modalData?.imDbRating < 7 ? 'menosValoradas' : 'masValoradas'}`}>
            <FontAwesomeIcon icon={faStar} />
            <span>{modalData?.imDbRating !== null ? modalData?.imDbRating : '0.0'}</span>
          </div>
        </div>

        <div className='detail-modal'>
          <h3>{modalData?.title}</h3>
          <p>{modalData?.plot}</p>
          <div>
            <span>Indefinido</span>
            <span className='separator-circle'>.</span>
            <span>
              {
                modalData?.genreList.map(element => ( 
                  <i key={element.value}>
                    {element.value}/
                  </i>
                ))
              }
            </span>
            <span className='separator-circle'>.</span>
            <span>{modalData?.runtimeStr}</span>
          </div>

          <div className='modal-buttons'>
            <button className='btn-verahora' onClick={pagTrailer}><FontAwesomeIcon icon={faCircleRight} /> VER AHORA</button>
            <button className='btn-verdespues'><b>+</b> VER DESPUES</button>
          </div>

        </div>

      </Box>
    </Modal>
  )
}
