import {useNavigate} from 'react-router-dom'

export default ({username,userId})=>{
    const navigate = useNavigate();
    const letter   = username.charAt(0).toUpperCase()
    const user     = username.slice(0,-10)
    return(
        <>
            <div className="flex  items-center justify-between pb-3">
                <div className="flex pl-0 ">
                    <div className="w-9 h-9 rounded-full bg-gray-300 flex flex-col items-center justify-center ">{letter}</div>
                    <h6 className="flex  items-center  pl-3">{user}</h6>         
                </div>
                <div>
                    <button className="bg-black text-white rounded-lg p-1 pl-4 pr-4" onClick={()=>{
                        localStorage.setItem("toAccountId",userId);
                        localStorage.setItem("friendsName",user);
                        navigate('/send')
                    }}>Send </button>
                </div>
            </div>        
        </>
    )
}
