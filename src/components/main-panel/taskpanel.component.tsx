import "../../assets/styles/MainPanelStyle/main-panel.css"
const TaskPanel = (
    {   
        contentId,
    }:
    {   
        contentId:number,
    }
) => {

    //const content

    return(
        <div className="task-container">
            {contentId}
        </div>
    )

}


export default TaskPanel;