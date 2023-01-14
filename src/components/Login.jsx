import React, {useEffect, useState} from 'react'
import axios from 'axios';

export default function Login() {
    const [log, setLog] = useState(true);
    const [name, setUser] = useState('');
    const [last, setLast] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [data, setData] = useState([]);

    useEffect(()=>{
       getData()
    })
    async function getData(){
        const res = await axios.get("http://localhost:8000/users");
        setData(res.data);
    }

    function Submit(e){
        e.preventDefault();
        if(log){
            if(repassword == password){
                axios.post("http://localhost:8000/users",{
                    name: name,
                    last: last,
                    email: email,
                    password: password
                })
            }
        }
        else{
            const res = data.filter((e)=>{
                if (e.email == email && e.password == password){
                    return e
                }
            })
            if(res){
                location.href = "/home";
            }
        }  
    }
  return (
    <form onSubmit={Submit} className={`absolute top-[20%] left-[35%] w-[30%] ${log == false ? 'h-[50vh]' : 'h-auto'} bg-gray-700 rounded-lg p-16`} action="">
        {
            log ?
            <>
            <div className='mb-8'>
                <input type="text" id="name" placeholder='Name' className='w-[100%] h-[35px] p-2 rounded-md' required onChange={(e)=>{setUser(e.target.value)}} />
            </div>
            <div className='mb-8'>
                <input type="text" id="last" placeholder='LastName' className='w-[100%] h-[35px] p-2 rounded-md' required onChange={(e)=>{setLast(e.target.value)}} />
            </div>
            </>: null
        }
        <div className='mb-8'>
            <input type="text" id='email' placeholder='Email' className='w-[100%] h-[35px] p-2 rounded-md' required onChange={(e)=>{setEmail(e.target.value)}} />
        </div>
        <div className='mb-8'>
            <input type="password" id='password' placeholder='Password' className='w-[100%] h-[35px] p-2 rounded-md' required onChange={(e)=>{setPassword(e.target.value)}} />
        </div>
        {
            log ?
           <div>
                <input type="password" id='reppassword' placeholder='repPassword' className='w-[100%] h-[35px] p-2 rounded-md' required onChange={(e)=>{setRepassword(e.target.value)}} />
            </div>
            : null 
        }
        <div className='sticky flex content-center flex-wrap top-[100%] flex-col mt-10'>
            <button className='text-white rounded-md bg-blue-500 w-52 h-10'>{log == false ? "Login" : "Sing up"}</button>
            <p onClick={()=>setLog(!log)} className='text-blue-700 text-right mt-3 hover:decoration-blue-700 cursor-pointer' style={{"textDecoration": "underline"}}>{log ? "Log in" : "Sing up"}</p>
        </div>
    </form>
  )
}
