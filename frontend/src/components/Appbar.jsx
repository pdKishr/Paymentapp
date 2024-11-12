import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

export default ()=>{
  const navigate = useNavigate()
    const [username,setUsername] = useState('User')
    useEffect(()=>{
          let name = localStorage.getItem('name');
          
          if(name){
            const newName =  name.charAt(0).toUpperCase() + name.slice(1)
            setUsername(newName);
          }  
    })
  
  const letter = username.charAt(0);
    return(
        <>
         <div className="flex justify-between border-b p-5  box-border">
            <h3 className="font-bold text-xl">Payments App</h3>
            <button onClick={
              ()=>{
                navigate('/update')
              }
            }>Hello, {username} <span>{letter}</span></button>
          </div>
        </>
    )
}

