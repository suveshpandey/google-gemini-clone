import { useContext, useState } from "react";
import Sidebar from "./components/Sidebar"
import Maincomp from "./components/Maincomp"
import { Context } from "./context/Context";
import {Signup} from "./components/Signup";

function App() {
  const [extended, setExtended] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const {signup, setSignup} = useContext(Context);
  return (
    <div className={`flex w-[100%]`}>
      {signup  ? 
      <>
        <Sidebar extended={extended} setExtended={setExtended} isDarkMode={isDarkMode} />
        <Maincomp extended={extended} setExtended={setExtended} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </>
      : <Signup />}
    </div>
  )
}

export default App
