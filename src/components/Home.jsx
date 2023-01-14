import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {GrAddCircle} from 'react-icons/gr';
import {MdEdit} from 'react-icons/md';
import {IoIosRemoveCircle} from 'react-icons/io'
import {CiCircleRemove} from 'react-icons/ci'

export default function Home() {
    const [data, setData] = useState([])
    const [post, setPost] = useState(false)
    const [name,setName] = useState('')
    const [price, setPrice] = useState(0)
    const [cant, setCant] = useState(0)
    const [update, setUpdate] = useState(false);
    const [id, setId] = useState(0);

    useEffect(()=>{
        getData()
     })
     async function getData(){
         const res = await axios.get("http://localhost:8000/products");
         setData(res.data);
     }
     function Submit(){
        if(!update){
          axios.post("http://localhost:8000/products",{
            name: name,
            price: price,
            cant: cant
            })  
        }
        else{
            axios.put("http://localhost:8000/products/"+id,{
                name: name,
                price: price,
                cant: cant
            }) 
        }
        
     }
  return (
    <div className='main w-[100%]  p-10'>
        <div className='flex flex-wrap mb-20'>
            {
                data.map(e=>(
                    <div className="w-[20%] grid grid-cols-1 gap-6 bg-slate-900 h-[30vh] ml-10 rounded-md">
                        <div className='bg-blue-600 p-2 h-[50%] flex justify-between rounded-md'>
                            <h2 className='text-white text-xl'>{e.name}</h2>
                            <h2 className='text-white'>Cant: {e.cant}</h2>
                        </div>
                        <div className='p-4 sticky top-[100%] flex justify-between h-[9vh]'>
                            <div className='rounded-md flex px-1 justify-center py-2 bg-gradient-to-br to-slate-50 from-green-300'>
                               <h2 className='text-gray-800 text-md'>{e.price}$</h2> 
                            </div>
                            <div className='flex'>
                                <div onClick={()=>{setPost(true), setUpdate(true), setId(e.id)}} className='p-2 mr-3 cursor-pointer bg-[#FFFFFF70]'>
                                    <MdEdit style={{fontSize: "25px"}} />
                                </div>
                                <div onClick={()=>{
                                    axios.delete("http://localhost:8000/products/"+e.id);
                                }} className='p-2 cursor-pointer bg-red-400'>
                                    <IoIosRemoveCircle style={{fontSize: "25px"}} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
            <GrAddCircle onClick={()=>setPost(true)} color='white' style={{cursor: "pointer",background: "white", fontSize: "80px", borderRadius: "100%", position: "absolute", left: "45%"}} />
            {
                post ? 
            <div className='ansolute l-[30%] top-[20%]'>
                <form onSubmit={Submit} className={`absolute top-[20%] left-[35%] w-[30%] bg-gray-700 rounded-lg p-16`} action="">
                    <CiCircleRemove onClick={()=>setPost(false)} style={{cursor: "pointer","position": "absolute", left: "90%", color: "red", top: "3%", fontSize: "30px"}}/>
                    <div className='mb-8'>
                        <input type="text" id="name" placeholder='Name' className='w-[100%] h-[35px] p-2 rounded-md' required onChange={(e)=>{setName(e.target.value)}} />
                    </div>
                    <div className='mb-8'>
                        <input type="text" id="price" placeholder='price of product' className='w-[100%] h-[35px] p-2 rounded-md' required onChange={(e)=>{setPrice(e.target.value)}} />
                    </div>
                <div className='mb-8'>
                    <input type="text" id='cant' placeholder='cantidad of product' className='w-[100%] h-[35px] p-2 rounded-md' required onChange={(e)=>{setCant(e.target.value)}} />
                </div>
                <button className='text-white rounded-md bg-blue-500 w-52 h-10'>Add</button>
                </form>
            </div>
            :null
            }
    </div>
  )
}
