import React from 'react'

const Header = ({headerName, headerTitle}) => {
  return (
    <div className="flex justify-between bg-white p-1">
        <h2 className="text-2xl font-semibold">{headerTitle}</h2>
        <p className="flex justify-center items-center gap-1">
          {headerName}
          <span>
            <FaRegUserCircle size={25} />
          </span>
        </p>
      </div>
  )
}

export default Header