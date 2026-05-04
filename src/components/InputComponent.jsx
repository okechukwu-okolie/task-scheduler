import React from 'react'

const InputComponent = ({inputName,inputType,inputValue,inputOnChange,placeholder, classname}) => {
  return (
    <div >
        <label htmlFor="" className='block mb-2'>
            {inputName}
        </label>
            <input 
                type="inputType"
                value={inputValue} 
                onChange={inputOnChange}
                placeholder={placeholder}
                className={classname}
                className='border-b-black border-1 w-60 h-12 rounded-[7px] mx-8 px-2'
                />
        
        
    </div>
  )
}

export default InputComponent