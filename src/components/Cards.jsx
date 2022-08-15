import React,{useState} from 'react'
import axios from 'axios'
import {AiFillSetting} from 'react-icons/ai';
import {FaTrash}from 'react-icons/fa'
import Swal from 'sweetalert2';
import { Url } from '../services/urls';
import FormModal from './FormModal';
import {TbMoodEmpty} from 'react-icons/tb'
import { v4 as uuidv4 } from 'uuid';
const photo = require('../assests/differentPets.png')


const Cards = ({data,setData}) => {
    const
    [show,setShow]=useState(false),
    [item,setItem]=useState({}),

    updatePet=(pet)=>{
        setItem(pet)
        setShow(true)
    },

    deletePet= async (pet)=>{
        const pets = data.filter(e=>e._id !== pet._id)
        await axios.delete(Url+`/${pet._id}`)
        setData(pets)
        console.log(pets);
    },
    
    confirmDeletePet= (pet)=>{
        Swal.fire({
            title: `Esta seguro de eliminar a ${pet.name}`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
            denyButtonColor: 'tomato',
            confirmButtonColor:'#70da8a',
            background:'#ecf0f3',
            }).then((result) => {
            
            if (result.isConfirmed) {

                 deletePet(pet)

                Swal.fire({title:`Se elimino ${pet.name}!`,
                 confirmButtonColor:'#70da8a', icon:'success',background:'#ecf0f3',})

            } else if (result.isDenied) {
                Swal.fire({title:'No se guardarón los cambios', confirmButtonColor:'#70da8a',
                 icon:'info', iconColor:'tomato',background:'#ecf0f3',})
            }
        })
    }
  return (
    <div className='mt-3 wrapperCards pb-3'>
       {data.length>0 ?
       <div className='d-flex flex-wrap gap-2 justify-content-around contentCards px-3'>
        {data.map(e=>
            <div className='cards p-1' key={uuidv4()}>

               <div className='iconsCards'>
                    <div className='mb-2' onClick={()=>updatePet(e)}> <AiFillSetting size={32} className='iconConfi '/> </div>
                    <div onClick={()=>confirmDeletePet(e)}> <FaTrash size={30} className='iconTrash'/> </div>
               </div>
                <img src={e.image?e.image:photo} width='100%'  alt={e.name}/>
               
                <div className='d-flex  felx-wrap description  flex-column'>
                    <p className='w-100 text-center mb-1'>Nombre: <span>  {e.name}</span></p>
                    <p className='w-100 text-center mb-1'>Edad: <span>  {e.age}</span></p>
                    <p className='w-100 text-center mb-1'>Especie: <span>  {e.specie}</span></p>
                </div>
            </div>
        )}
        </div>:
        <div className='d-flex justify-content-center gap-2 m-auto flex-column'>
            <TbMoodEmpty className='w-25 m-auto' size={100} color='#BF8756'/>
            <p className='w-25 m-auto text-center'>No hay mascotas para mostrar</p>
        </div>

       }
       <FormModal dato={data} setData={setData} item={item} setShow={setShow} show={show} />
    </div>
  )
}

export default Cards