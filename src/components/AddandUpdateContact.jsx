import React from 'react'
import Model from './Model'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import "./Model.css"
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { toast } from 'react-toastify'
import * as Yup from "yup";

const contactSchemaValidation=Yup.object().shape({
    name:Yup.string().required("Name is Required"),
    email:Yup.string().email("Ivalid Email").required("Email is Required"),
    phone:Yup.number().required("Number is Required"),
})

const AddandUpdateContact = ({isOpen, onClose, isUpdate,contact}) => {
        const addContact= async (contact)=>{
            try {
                const contactRef=collection(db, "contacts")
                await addDoc(contactRef,contact);
                toast.success("Contact Added Successfully");
                onClose();
            } catch (error) {
                console.log(error);
            }
        }

        const updateContact= async (contact, id)=>{
            try {
                const contactRef=doc(db, "contacts", id)
                await updateDoc(contactRef,contact);
                toast.success("Contact Update Successfully");
                onClose();
            } catch (error) {
                console.log(error);
            }
        }

  return (
    <div  >
        <Model  isOpen={isOpen} onClose={onClose}>
        <div className="mymodel">
        <Formik 
        validationSchema={contactSchemaValidation}
            initialValues={isUpdate?{
                name:contact.name,
                email:contact.email,
                phone:contact.phone,
            }:{
                name:"",
                email:"",
                phone:"",
            }
        }
            onSubmit={(values)=>{
                console.log(values);
                isUpdate ? updateContact(values, contact.id):
                addContact(values);
            }}
        >
            <Form> <div className='inputname'>
                <label htmlFor="name">Name</label>
                <Field  name='name'  className="inputfield"/>
                <div style={{color:"red" , fontSize:"15px"}}>
                    <ErrorMessage name="name" />
                </div>
                <label htmlFor="email">Email</label>
                <Field type="email" name='email'  className="inputfield"/>
                <div style={{color:"red" , fontSize:"15px"}}>
                    <ErrorMessage name="email" />
                </div>
                <label htmlFor="phone">Phone</label>
                <Field type="number" name='phone'  className="inputfield" maxLength="11"/>
                <div style={{color:"red" , fontSize:"15px"}}>
                    <ErrorMessage name="phone" />
                </div>
                </div>
                <div className="mybutton">
                <button type="submit" className='addbutton'>
                    {isUpdate ? "Update": "Add"} Contact
                </button>
                </div>
            </Form>
        </Formik>
        </div>

    </Model>
    </div>
  )
}

export default AddandUpdateContact