import { TaskModel as Task } from "./TaskModel";
import { TaskType } from "./TaskModel"

const tasksInToDo = [
  new Task(1, 'bug', 'Implement login', 'Create login functionality', 'In Progress', 'Alice', 'High'),
  new Task(2, 'fix','Setup Redux', 'Initialize Redux store and slices', 'Backlog', 'Bob', 'Medium'),
  new Task(3, 'feature','Design database schema', 'Prepare schema for database', 'Done', 'Charlie', 'Low'),
  new Task(4, 'feature','Design database schema', 'Some long description Some long description Some long description Some long description Some long description Some long description ', 'Done', 'Charlie', 'Low'),
]
  
export const TaskCardList = () => {


  return(
    
    <ul role="list" className="divide-y divide-gray-100">
    {tasksInToDo.map( (task) => (
        
        <li key = {task.id} className="flex justify-between gap-x-6 py-5">
            <TaskCard key={task.id} task={task}></TaskCard>
        </li>
    ))}
  </ul>
  )
}


export const TaskCardWithNodata = () => {
  var task = new Task(1, 'bug', 'Implement login', 'Create login functionality', 'In Progress', 'Alice', 'High');

    return(
      <div className="bg-white border-l-4 border-blue-500 shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
          <span
            className={`text-xs font-bold uppercase ${
              task.priority === 'High'
                ? 'text-red-600 bg-red-100'
                : task.priority === 'Medium'
                ? 'text-yellow-600 bg-yellow-100'
                : 'text-green-600 bg-green-100'
            } px-2 py-1 rounded-full`}
          >
            {task.priority}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-4 truncate max-w-xs">{task.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-gray-500">
            <strong>Assignee:</strong> {task.assignee}
          </span>
          <span
            className={`text-xs font-bold uppercase ${
              task.status === 'In Progress'
                ? 'text-blue-600 bg-blue-100'
                : task.status === 'Backlog'
                ? 'text-gray-600 bg-gray-100'
                : 'text-green-600 bg-green-100'
            } px-2 py-1 rounded-full`}
          >
            {task.status}
          </span>
        </div>
      </div>
    )
  }

export default function TaskCard(task){
    return(
      <div className="bg-white border-l-4 border-blue-500 shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
          <span
            className={`text-xs font-bold uppercase ${
              task.priority === 'High'
                ? 'text-red-600 bg-red-100'
                : task.priority === 'Medium'
                ? 'text-yellow-600 bg-yellow-100'
                : 'text-green-600 bg-green-100'
            } px-2 py-1 rounded-full`}
          >
            {task.priority}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-4 truncate max-w-xs">{task.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-gray-500">
            <strong>Assignee:</strong> {task.assignee}
          </span>
          <span
            className={`text-xs font-bold uppercase ${
              task.status === 'In Progress'
                ? 'text-blue-600 bg-blue-100'
                : task.status === 'Backlog'
                ? 'text-gray-600 bg-gray-100'
                : 'text-green-600 bg-green-100'
            } px-2 py-1 rounded-full`}
          >
            {task.status}
          </span>
        </div>
      </div>
    )
}