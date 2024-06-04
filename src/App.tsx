// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./assets/styles/App.css"
import SideBar from "./components/sidebar/sidebar.component"
import TaskContainer from "./components/task-container/TaskContainer"
function App() {

  return (
    <>
      <SideBar/>
      <TaskContainer/>
    </>
  )
}

export default App
