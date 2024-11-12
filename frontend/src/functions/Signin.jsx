import { useState } from 'react'
import axios from 'axios'
import Heading from '../components/Heading'
import Subheading from '../components/Subheading'
import Input from '../components/Input'
import Button from '../components/Button'
import Warning from '../components/Warning'
import { useNavigate } from 'react-router-dom'

export default ()=>{
    const [email,setEmail] = useState("");
    const [pass ,setPass]  = useState("");
    const navigate = useNavigate()

    return(
        <>
        <div className="flex flex-col items-center justify-center h-screen bg-slate-200  ">
            <div className="bg-white rounded-md w-11/12 shadow-md sm:w-96 sm:p-5 pb-3">
                <Heading heading={"Sign In"}/>
                <Subheading subhead={"Enter your credentials to access your"}/>
                <Input label={"Email"} placeholder="Jhondoe@example.com" type="text" onChangeHandler={(e)=>{
                    setEmail(e.target.value)
                }}/>
                <Input label={"Password"} placeholder="" type="text" onChangeHandler={(e)=>{
                    setPass(e.target.value)
                }}/>
                  
                <Button buttonName={"Sign In"} onClickHandler={ async()=>{
                  let statusCode = 200;
                  let resolved   = '';
            
                  try{
                    resolved = await axios.post('http://localhost:3001/api/v1/user/signin', {
                        username : email,
                        password : pass
                      })                  
                    }
                    catch(e){
                          statusCode = e.response.status;
                    }
                   
                    switch(statusCode){
                            case 411 : alert('invalid input or username/password not exists');break;
                            case 200 : localStorage.setItem("token",resolved.data.token)
                                       localStorage.setItem("name",resolved.data.name)
                                       
                                       navigate('/home')
                                       break; 
                    }                                 
                }}/>
                <Warning warn1="Don't have an account? " warn2={"Sign up"} onClickHandler={()=>{
                     navigate('/signup')
                }}/>
            </div>
        </div>   
        </>
    )
}
