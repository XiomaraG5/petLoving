import React from 'react'
import axios from 'axios'
import { Url } from '../services/urls'
import { Modal } from 'react-bootstrap'
import {IoMdCloseCircle} from 'react-icons/io'
import Swal from 'sweetalert2'
import { useForm } from '../hooks/useForm'
const photo = require('../assests/differentPets.png')


const FormModal = ({show,setShow,setData,dato,item}) => {
  
const 
initialValue={
    name:'',
    age:'',
    specie:'',
    image:''
},

{ formValue,handleFileChanged,handleInputChange,reset}=useForm(initialValue),

handleSubmit= async(e)=>{
    e.preventDefault()

    const {name,age,specie, image}=formValue

    if(item){

        if(name || age || specie || image){

            const filtro = dato.filter(e=>e._id !== item._id ),
            data={
                name:name?name:item.name,
                age:age?age:item.age,
                specie:specie?specie:item.specie,
                image:image?image:item.image,
            }
            await axios.put(Url+'/'+item._id,data)

            filtro.push({...data,_id:item._id})
            setData(filtro)


            Swal.fire(
                {title:`Se modificó ${data.name}!`, 
                confirmButtonColor:'#70da8a', 
                icon:'success',
                background:'#ecf0f3',})
                
        }else{
            
            Swal.fire(
                {title:'Por favor modifica algún cambio antes de guardar',
                confirmButtonColor:'#70da8a', 
                icon:'info', iconColor:'tomato',
                background:'#ecf0f3'})
        }
        setShow(false)
    }else{

        if(name && age && specie){
            const values = await axios.post(Url,formValue)

            Swal.fire(
                {title:'Guardada nueva mascota!', 
                confirmButtonColor:'#70da8a', 
                icon:'success',
                background:'#ecf0f3',})
                
                if(dato.length>0){
                    setData([...dato,values.data])
                }else{
                setData([values.data])
                }                 

        }else{

            Swal.fire(
                {title:'Por favor dinos: el nombre, la edad y la especie de tu mascota',
                confirmButtonColor:'#70da8a', 
                icon:'info', iconColor:'tomato',
                background:'#ecf0f3',
            })

        }

    }

    reset()
    setShow(false)
}


  return (
    <Modal show={show} centered onHide={()=>setShow(false)}>
        <div className='contentModal'>
            <IoMdCloseCircle className='iconClose' size={25} onClick={()=>setShow(false)}/>
            <div className='mt-2'>
                    <h4 className='titleModal text-center mb-3'>{item? 'Modificar':'Agrega una mascota' }</h4>
            </div>
            <div className='p-3'>
                        {item &&
                        <div className='d-flex'>
                                <img src={item.image? item.image :photo} width='30%' className='imgModal' alt={item.name} />
                        </div>
                        }
                <form className='form mt-3 p-4' onSubmit={handleSubmit}>
                    <input placeholder={item? `Nombre: ${item.name}`:'Nombre'} type='text' name='name' className='input' onChange={handleInputChange}/>
                    <input type='file'  className='input mt-2' onChange={handleFileChanged}/>

                    <div className='d-flex mt-2 justify-content-between'>

                        <input placeholder={item?`${'Edad '+ item.age}`:'Edad'} type='number' name='age' min='0' max='15'
                        className='inputNumber' onChange={handleInputChange} />
                        <select className='selectModal' name='specie' onChange={handleInputChange} >
                            <option   value="0">Especie</option>
                            <option value="canine">Canino</option>
                            <option value="feline">Felino</option>
                            <option value="birds">Ave</option>
                            <option value="rodent">Roedor</option>
                        </select>

                    </div>

                    <div className='save'> 
                        <button type='submit'>Guardar </button>
                    </div>

                </form>
            </div>
        </div>
    </Modal>
  )
}

export default FormModal