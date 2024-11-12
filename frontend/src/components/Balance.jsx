import axios from 'axios'
import {useState,useEffect} from 'react'

export default ()=>{
   const [token,setToken] = useState('')
   const [bal,setBal]     = useState(0)

   useEffect(()=>{
       const tkn = localStorage.getItem("token");
       setToken(tkn)
    },[])
       
    //very very important 
            const fun =  async ()=>{  
                const res =  await axios.get('http://localhost:3001/api/v1/account/balance',{
                    headers : {
                        auth : `bearer ${token}`
                    }
                })
                setBal(res.data.balance);           
            }
        
            useEffect(()=>fun);
    
    return(
        <>
        <div className=" sm:pl-5 sm:p-4">
           <h3 className=" font-bold ">Your balance <span> {bal} </span></h3>
        </div>
        </>
    )
}

