import React from 'react'
import '../styles/home.css'

export default function LoaderSkeleton() {
  return (
    <div className='cards-home'>
      <div className='loader'><span></span></div>
      <div className='loader'><span></span></div>
      <div className='loader'><span></span></div>
      <div className='loader'><span></span></div>
      <div className='loader'><span></span></div>
      <div className='loader'><span></span></div>
      <div className='loader'><span></span></div>
      <div className='loader'><span></span></div>
      <div className='loader'><span></span></div>
      <div className='loader'><span></span></div>
    </div>
  )
}
