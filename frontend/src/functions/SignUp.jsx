import { useState } from 'react'
import axios from 'axios'
import Heading from '../components/Heading'
import Subheading from '../components/Subheading'
import Input from '../components/Input'
import Button from '../components/Button'
import Warning from '../components/Warning'
import { useNavigate } from 'react-router-dom'

export default ()=>{
    const [fname,setFname] = useState("");
    const [lname,setLname] = useState("");
    const [email,setEmail] = useState("");
    const [pass ,setPass]  = useState("");
    const navigate = useNavigate()
    
    return(
       <>
        <div className="flex flex-col items-center justify-center h-screen bg-slate-200  ">
            <div className="bg-white rounded-md w-11/12 shadow-md  sm:w-96  pb-3 ">
                <Heading heading={"Sign Up"}/>
                <Subheading subhead={"Enter your information to create an"}/>
                <Input label={"First Name"} placeholder="Jhon" value={fname} type="text" onChangeHandler={(e)=>{
                    setFname(e.target.value)
                }} />
                <Input label={"Last Name"} placeholder="Doe" value={lname} type="text" onChangeHandler={(e)=>{
                    setLname(e.target.value)
                }} />
                <Input label={"Email"} placeholder="Jhondoe@example.com" value={email} type="text" onChangeHandler={(e)=>{
                    setEmail(e.target.value)
                }} />
                <Input label={"Password"} placeholder="" type="text" value={pass} onChangeHandler={(e)=>{
                    setPass(e.target.value)
                }}/>      
                
                <Button buttonName={"Sign Up"} onClickHandler={ async()=>{
                  let statusCode = 200;
                  let resolved   = '';
                
                  try{
                    resolved = await axios.post('http://localhost:3001/api/v1/user/signup', {
                        firstname: fname,
                        lastname : lname,
                        username : email,
                        password : pass
                      })                  
                    }
                    catch(e){
                          statusCode = e.response.status;
                    }
                    
                switch(statusCode){
                            case 411 : alert('invalid input');break;
                            case 403 : alert('user already exists');break;
                            case 200 : localStorage.setItem("token",resolved.data.token)
                                       localStorage.setItem("name",resolved.data.name)
                                       navigate('/home')
                                       break;
                    }
                                  
                }} />
                <Warning warn1="Already have an account? " warn2={"Login"} onClickHandler={()=>{                                
                     navigate('/signin')
                }}/>
            </div>
        </div>
       </>
    )
}
