// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./assets/styles/App.css"
import SideBar from "./components/sidebar/sidebar.component"
import MainPanel from "./components/main-panel/mainpanel.component"
import { useState } from "react";
import TaskContainer from "./components/task-container/TaskContainer"
function App() {
  const [selectedTabId, setSelectedTabId]= useState(1);

  const handleTabClick = (newTabId:number) => {
    setSelectedTabId(newTabId);
  };
  return (
    <>
      <SideBar tabId={selectedTabId} handleTabClick={handleTabClick}/>
      <MainPanel tabId={selectedTabId}/>
      <TaskContainer/>
    </>
  )
}

export default App
