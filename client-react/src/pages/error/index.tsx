import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorPage: React.FC = () => {
  const error: any = useRouteError()
  console.error(error)

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1 className='text-2xl'>Oops!</h1>
      <p className='my-[30px]'>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}

export default ErrorPage
