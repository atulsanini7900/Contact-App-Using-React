import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import './Model.css'
const Model = ({ onClose, isOpen, children }) => {


    return (
        <>
            {isOpen && (
                <>
                <div className='blur-div'>
                    <div className='dynamicStyle'>

                        <div className='myicon'>
                            <AiOutlineClose onClick={onClose}  className='closeicon'  />
                        </div>
                        {children}
                    </div>
                    <div  />
                    </div>
                </>
            )}

        </>


    )
}

export default Model;