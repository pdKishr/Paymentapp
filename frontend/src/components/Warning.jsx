

export default ({warn1,warn2,onClickHandler})=>{
    return(<>
    <div className="flex flex-col items-center ">        
            <h3 className="p-3">
                {warn1}
                <button className="underline" onClick={onClickHandler}>
                    {warn2}
                </button>
            </h3>
    </div>
    </>)
}