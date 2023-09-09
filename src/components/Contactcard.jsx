import React, { useState } from 'react'
import "./Contactcard.css"
import { HiOutlineUserCircle } from 'react-icons/hi'
import { RiEditCircleLine } from 'react-icons/ri'
import { IoMdTrash } from 'react-icons/io'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../config/firebase'
import AddandUpdateContact from './AddandUpdateContact'
import { toast } from 'react-toastify'
export const Contactcard = ({contact}) => {
  const [isOpen, SetOpen]=useState(false);
    
  const onOpen=()=>{
    SetOpen(true)
  }
  const onClose=()=>{
    SetOpen(false)
  }


const deleteContact= async(id)=>{
  try {
      await deleteDoc(doc(db,"contacts" , id));
      toast.success("Contact Deleted Successfully");

  } catch (error) {
    console.log(error);
  }
}

  return (
    <div>
        
            <div  key={contact.id} className='contact' >
              <HiOutlineUserCircle className='icon1' />
              <div className='data' >
                <h2>{contact.name}</h2>
                <p>{contact.email}</p>
                <p>{contact.phone}</p>
              </div>
              <div>
                <RiEditCircleLine onClick={onOpen} className="edit-icon" />
                <IoMdTrash onClick={()=>deleteContact(contact.id)} className='delete-icon'/>
              </div>
            </div>
          <AddandUpdateContact contact={contact} isUpdate  isOpen={isOpen} onClose={onClose}/>
        
       </div>
  )
}
