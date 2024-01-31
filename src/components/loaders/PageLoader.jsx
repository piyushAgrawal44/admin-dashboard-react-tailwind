import React from 'react'

function PageLoader(props) {
  return (
    <>
    <div className="fixed h-screen w-full bg-gray-300 bg-opacity-50 flex items-center justify-center py-2 z-10">
      <div className={`animate-spin rounded-full border-t-4 ${props.color} border-opacity-25 ${props.height} ${props.width}`}></div>
    </div>
    </>
  )
}

PageLoader.defaultProps={
  color: 'border-blue-500',
  width: 'w-16',
  height: 'h-16',
}

export default PageLoader