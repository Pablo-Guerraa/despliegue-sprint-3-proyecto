import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from './Card'
import InfiniteScroll from 'react-infinite-scroll-component'
import { moviesNextAsync } from '../redux/Actions/moviesAction';
import LoaderSkeleton from './LoaderSkeleton';
import '../styles/home.css'
import ModalDetail from './ModalDetail';

export default function MoviesAll() {

  const [ openModal, setOpenModal ] = useState(false);
  const [ modalData, setModalData ] = useState(null);
  const dispatch = useDispatch();
  const movies = useSelector((state => state.movies));

  return (
    <InfiniteScroll 
      dataLength={movies?.length}
      hasMore={true}
      next={()=> dispatch(moviesNextAsync(movies))}
      loader={
        <LoaderSkeleton/>
      }
    >
      <div className='cards-home'>
        {
          movies?.map((movie, index) => (
            <Card key={index} element={movie} setOpenModal={setOpenModal} setModalData={setModalData}/>
          ))
        }
      </div>
      <ModalDetail modalData={modalData} openModal={openModal} setOpenModal={setOpenModal}/>

    </InfiniteScroll>
  )
}
