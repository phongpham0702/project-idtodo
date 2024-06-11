import { useState } from "react";

import "../../assets/styles/MainPanelStyle/main-panel.css"

import Header from "../header/header.component";
import { Tasks } from "../../constant/Tasks";
import {TaskType} from "../../interfaces/TaskType"
import TaskContainer from "../task-container/TaskContainer";


type propsType = {
    tabId: number;
}



const MainPanel = ({ tabId }: propsType) => {
    const [tasks, setTasks] = useState<TaskType[]>(Tasks);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    return (
        <div className="main-panel">
            <Header tasks={tasks} setTasks={setTasks} modalOpen={modalOpen} SetModalOpen={setModalOpen} />
            {/* <TaskPanel contentId={tabId}/> */}
            <TaskContainer tasks={tasks} setTasks={setTasks} SetModalOpen={setModalOpen} />
        </div>
    )

}


export default MainPanel;