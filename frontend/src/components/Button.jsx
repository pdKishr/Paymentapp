
export default ({buttonName,onClickHandler})=>{
    return(
        <>      
        <div className="flex flex-col items-center p-1">
            <div className="w-11/12">
            <button className=" bg-black text-white w-full rounded-lg p-3" onClick={onClickHandler}>{buttonName}</button>
            </div>              
         </div>         
        </>
    )
}
