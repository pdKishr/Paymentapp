import Heading from '../components/Heading'
import Subheading from '../components/Subheading'
import Input from '../components/Input'
import Button from '../components/Button'
import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

export default ()=>{
    const [fname,setFname] = useState("");
    const [lname,setLname] = useState("");
    const [pass ,setPass]  = useState("");
    const [token,setToken] = useState("");
         
    const navigate = useNavigate()

    useEffect(()=>{
        const p = localStorage.getItem('token')
        setToken(p)
    })

    return <>
      <div className="flex flex-col items-center justify-center h-screen bg-slate-200  ">
      <div className="bg-white rounded-md w-11/12 shadow-md  sm:w-96  pb-3 ">
          <Heading heading={"Update"}/>
          <Subheading subhead={"you can change any number of fields in"}/>
                <Input label={"First Name"} placeholder="" value={fname} type="text" onChangeHandler={(e)=>{
                    setFname(e.target.value)
                }} />
                <Input label={"Last Name"} placeholder="" value={lname} type="text" onChangeHandler={(e)=>{
                    setLname(e.target.value)
                }} />
                <Input label={"Password"} placeholder="" type="text" value={pass} onChangeHandler={(e)=>{
                    setPass(e.target.value)
                }}/> 
        <Button buttonName={"accept changes"} onClickHandler={async ()=>{
          let catched = false;
           try{
                await axios.put('http://localhost:3001/api/v1/user/update',{
                    firstname : fname,
                    lastname  : lname,
                    password  : pass
                 },{
                   headers :{
                       auth : `bearer ${token}`
                   }
                 })
            }
            catch(e){
                console.log(e)
                catched = true;
                alert('invalid input')
            }
            if(!catched)  {
                alert('updated successfully')
                navigate('/home')
            }
             
        }}></Button>  
        <Button buttonName={"discard"} onClickHandler={()=>{
            navigate('/home')
        }}></Button> 
     </div>
     </div> 
    </>
}
