import {default as TaskCard} from "./TaskCard";
import { TaskModel as Task } from "./TaskModel";

const tasksInToDo = [
    new Task(1, 'bug', 'Implement login', 'Create login functionality', 'In Progress', 'Alice', 'High'),
    new Task(2, 'fix','Setup Redux', 'Initialize Redux store and slices', 'Backlog', 'Bob', 'Medium'),
    new Task(3, 'feature','Design database schema', 'Prepare schema for database', 'Done', 'Charlie', 'Low'),
    new Task(3, 'feature','Design database schema', 'Some long description Some long description Some long description Some long description Some long description Some long description ', 'Done', 'Charlie', 'Low'),
]

// function GetTask(){

// }

export default function TaskList(){
    return (
        <ul role="list" className="divide-y divide-gray-100">
            TASKLIST
            <li ></li>
            {tasksInToDo.map( (task) => (
                
                <li key = {task.id} className="flex justify-between gap-x-6 py-5">
                    {/* <TaskCard key={task.id} task={task}></TaskCard> */}
                    <div className="flex justify-between  gap-x-6 py-4 rounded-lg shadow-md mb-4">
                        <h3 className="text-lg font-bold mb-2">{task.type}</h3>
                        <p className="text-gray-700 mb-2">{task.description}</p>
                        <p className="text-sm text-gray-500"><strong>Assignee:</strong> {task.assignee}</p>
                        <p className="text-sm text-gray-500"><strong>Status:</strong> {task.status}</p>
                        <p className="text-sm text-gray-500"><strong>Priority:</strong> {task.priority}</p>
                    </div>
                </li>
            ))}
        </ul>
    )
}