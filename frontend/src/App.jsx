
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import SignUp from './functions/SignUp'
import Homepage from './functions/Homepage'
import Signin from './functions/Signin'
import Send from './functions/Send'
import Update from './functions/Update'

function App() {

  return (
    <> 
     <BrowserRouter>
        <Routes>
            <Route path="/signup" element={<SignUp/>}></Route>
            <Route path="/home" element={<Homepage/>}></Route>
            <Route path="/signin" element={<Signin/>}></Route>
            <Route path="/send" element={<Send/>}></Route>
            <Route path="/update" element={<Update/>}></Route>
        </Routes>
     </BrowserRouter>      
 
    </>
  )
}

export default App
