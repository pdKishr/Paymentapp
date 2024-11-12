import FilteredUser from "./FilteredUser"
import axios from 'axios'
import {useState,useEffect} from 'react'

export default ()=>{
    const [filter,setFilter]  = useState('')
    const [users,setUsers]    = useState([])
    const [token,setToken]    = useState('');
        
    useEffect(()=>{
        const tkn = localStorage.getItem('token');
        setToken(tkn);
    })
       
    let timeout;
    function debounce(){
       clearTimeout(timeout);
       timeout = setTimeout(()=>{
        getFilteredUsers()
        },500)
    }
    
       const getFilteredUsers  =  async ()=>{        
            const res = await axios.get(`http://localhost:3001/api/v1/user/bulk?filter=${filter}`,{
              headers:{
                  auth : `bearer ${token}`
              }
            })
            setUsers(res.data.users)
            console.log('async getFilteredUseres calling ')
        }
           
    return(   
        <>
            <div className="sm:pl-5">
                <h3 className="font-bold pb-2 pt-2 sm:pt-0">Users</h3>           
                <input type="text" placeholder="Search...." className="w-full border m-auto flex rounded-md p-2" onChange={(e)=>{
                      setFilter(e.target.value)
                      debounce()
                }}></input>           
            </div>
            <div className="pt-3 sm:pl-4">
            {users.map((user)=>{return<>
                   <FilteredUser username={user.username} userId ={user.userId}/>
            </>})}
            </div>
        </>
    )
}

