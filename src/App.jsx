import { useState } from "react";
import Sidebar from "./components/Sidebar"
import Maincomp from "./components/Maincomp"

function App() {
  const [extended, setExtended] = useState(true);
  return (
    <div className="flex w-[100%] ">
      <Sidebar extended={extended} setExtended={setExtended} />
      <Maincomp extended={extended} setExtended={setExtended} />
    </div>
  )
}

export default App
