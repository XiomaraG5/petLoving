import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Cards from '../components/Cards';
import FormModal from '../components/FormModal';
import { Url } from '../services/urls';
const photo = require('../assests/pexels-lumn-406014.jpg');

const Landing = () => {
   const 
        [show,setShow]=useState(false),
        [data,setData]=useState([]),

        getData = async ()=>{
            const datos = await axios.get(Url)
            console.log(datos.data);  
            setData(datos.data) 
        }

        useEffect(()=>{
            getData()
        },[])

  return (
    <div className='containerLanding'>
        <header className='d-flex w-100 header'>
            <div className='w-100 contentTitle'>
                <h2 className='title'>Pet Loving</h2>
            </div>
            <div className='headerImg'>
                <img src={photo} className='headerImg_img' alt='pet'/>
            </div>
        </header>
        <div className='text'>
            <p>Publica o encuentra tu mejor amigo</p>
            
        </div>
        <button className='btnAdd' onClick={()=>{setShow(true)}}>Agregar</button>
        <Cards data={data} setData={setData}/>
        <FormModal setShow={setShow} show={show} setData={setData} dato={data}/>
    </div>
  )
}

export default Landing