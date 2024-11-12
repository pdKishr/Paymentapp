
export default ({label,placeholder,type,onChangeHandler})=>{
    
    return(
        <>        
            <div className="pb-3">
                <h1 className=" p-1 pl-4 font-bold">{label}</h1>
                <div className="flex flex-col items-center">               
                    <input className="border rounded w-11/12 p-2 m-1"  type={type} placeholder={placeholder} onChange={onChangeHandler}></input>
                </div>    
            </div>  
        </>
    )
}

