import Appbar from '../components/Appbar'
import Balance from '../components/Balance'
import User from '../components/User'

export default ()=>{
    return(

         <>
            <Appbar />
            <div className="p-5 sm:p-10">
            <Balance/>
            <User/>
            </div>
         </>
        
    )
}