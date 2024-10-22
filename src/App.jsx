import { useState } from "react";
import Sidebar from "./components/Sidebar"
import Maincomp from "./components/Maincomp"

function App() {
  const [extended, setExtended] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <div className="flex w-[100%] ">
      <Sidebar extended={extended} setExtended={setExtended} isDarkMode={isDarkMode} />
      <Maincomp extended={extended} setExtended={setExtended} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </div>
  )
}

export default App
