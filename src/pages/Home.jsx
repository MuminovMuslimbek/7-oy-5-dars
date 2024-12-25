import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement } from '../store/counterSlice'

function Home() {
  const counter = useSelector(state => state.counter)

  const dispatch = useDispatch()

  function handleIncrement() {
    dispatch(increment(10))
  }

  function handleDecrement() {
    dispatch(decrement(10))
  }

  return (
    <div className='flex flex-col justify-center items-center mx-auto my-[10px] w-full max-w-[1200px]'>
      <h3>{counter}</h3>
      <button onClick={handleIncrement}>increment</button>
      <button onClick={handleDecrement}>decrement</button>
    </div>
  )
}

export default Home