import { TaskType } from "../interfaces/TaskType";
import api from "../components/data/api";

export let Tasks: TaskType[] = [];

// Function to fetch tasks from the API
async function fetchTasks() {
    let Tasks: TaskType[] = [];

    await api.get<TaskType[]>('/tasks')
        .then(response => {
            // Spread the new tasks into the existing Tasks array
            Tasks = [...Tasks, ...response.data];
        })
        .catch(error => {
            // Log any errors that occur during the fetch
            console.error('Error fetching tasks', error);
        });

    return Tasks;
}

// Call the function to fetch tasks
Tasks = await fetchTasks();
