import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import {collection, getDoc, getDocs, onSnapshot} from "firebase/firestore";
import {db} from "./config/firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {IoMdTrash} from "react-icons/io"
import { Contactcard } from './components/Contactcard';
// import Model from './components/Model';
import { FiSearch } from 'react-icons/fi';
import { AiFillPlusCircle } from 'react-icons/ai';
import AddandUpdateContact from './components/AddandUpdateContact';
import { IoMdToday } from 'react-icons/io';
function App() {
    const [contacts, setContacts]=useState([]);
    const [isOpen, SetOpen]=useState(false);
    
    const onOpen=()=>{
      SetOpen(true)
    }
    const onClose=()=>{
      SetOpen(false)
    }

    useEffect(()=>{
        const getContacts=async ()=>{
            try {
              const contactsRef=collection(db, "contacts");
              // const contactsSnapshot=await getDocs(contactsRef)
              onSnapshot(contactsRef, (snapshot)=>{
                  const contactLists=snapshot.docs.map((doc)=>{
                return{
                  id:doc.id,
                  ...doc.data(),
                };
              });
              setContacts(contactLists);
              return contactLists;
              })
              
              
              
            } catch (error) {
              console.log(error);
            }
        };

        getContacts();
    },[])


    const filterContacts=(e)=>{
      const value=e.target.value;
      const contactsRef=collection(db, "contacts");
              // const contactsSnapshot=await getDocs(contactsRef)
              onSnapshot(contactsRef, (snapshot)=>{
                  const contactLists=snapshot.docs.map((doc)=>{
                return{
                  id:doc.id,
                  ...doc.data(),
                };
              });

              const filterContacts= contactLists.filter(contact =>
                contact.name.toLowerCase().includes(value.toLowerCase()))
              setContacts(filterContacts);
              return filterContacts;
              })
              
    }
  return (
    <>
   
      <Navbar/>
      <div className='search'>
    <FiSearch className='Fi-Search'/>
      <input
      onChange={filterContacts} type="text" />
      
        <AiFillPlusCircle onClick={onOpen} className='BsFillPlusSquareFill'/>
      
      </div>
       <div>
        {
          contacts.map((contact)=>(
            <Contactcard key={contact.id} contact={contact}/>
          ))
        }
       </div>
        <AddandUpdateContact
        onClose={onClose}
        isOpen={isOpen}
        />

        <ToastContainer position='bottom-center' />
      </>
  )
}

export default App
