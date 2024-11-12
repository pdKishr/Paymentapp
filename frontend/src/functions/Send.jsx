
import {useState,useEffect} from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default ()=>{
    const [friend,setFriend] = useState('')
    const [toAccountId,setToAccountId] = useState('')
    const [token,setToken] = useState('')
    const [amount,setAmount] = useState(0)
    const navigate = useNavigate()
 
    useEffect(()=>{
        const fnd  = localStorage.getItem('friendsName');
        const id1  = localStorage.getItem('toAccountId');
        const tkn  = localStorage.getItem('token')
        setToAccountId(id1);
        setFriend(fnd);
        setToken(tkn)
      
    })

    const trasnferAmount = async()=>{
        let catched = false;
        let res;
        try {
             res = await axios.post('http://localhost:3001/api/v1/account/transfer',
                {
                    toAccountId : toAccountId,
                    amount : amount
                },
                {                  
                    headers : {
                    auth : `bearer ${token}`
                    }
                }
             ) 
                 
        }
        catch(e){
             catched = true;
            
        }
        if(catched){
            alert('insufficient balance');
            navigate('/home')
        }
        else{
            alert(`transfered ${amount} to ${friend} successfully`)
        }
    }
    
    return(
        <>
        <div className="flex flex-col items-center h-screen justify-center bg-slate-100 ">
           <div className="bg-white rounded-md">
                <h3 className="font-bold text-2xl pt-5 pb-10 pl-24 pr-24 ">Sending money to</h3>
                <div className="pl-6">
                <h3 className="font-bold flex text-lg">
                    <span className="bg-green-500 w-9 h-9 rounded-full flex items-center justify-center text-white mr-2"> {friend.charAt(0)}</span>
                    {friend}
                </h3>
                <h3 className="mb-1 font-semibold">Amount (in Rs)</h3>
                <input type="number" placeholder="Enter amount" className="border rounded-md w-11/12 p-2 " onChange={(e)=>{
                    setAmount(e.target.value)
                }}></input><br></br>
                <button className="bg-green-500 w-11/12 p-1 text-white rounded-md mt-3 mb-8" onClick={trasnferAmount}>Initiate Transfer</button>
                </div>             
           </div>
        </div>
        </>
    )
}
