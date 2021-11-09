import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState, useEffect } from "react";

const App = () => {
    const [showAddTask, setShowAddTask] = useState(false);
	const [tasks, setTasks] = useState([])

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks();
            setTasks(tasksFromServer);
        }
        getTasks();
    }, []) // Empty array is the dependency array
    
    // Fetch Tasks
    const fetchTasks = async () => {
        const res = await fetch("http://localhost:5000/tasks"); // Using fetch API
        const data = await res.json(); // await because fetch returns a promise. And we need to de-serialize the response.
        return data;
    }
    
    // Fetch Task
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`); // Using fetch API
        const data = await res.json(); // await because fetch returns a promise. And we need to de-serialize the response.
        return data;
    }
    
    // Add Task
    const addTask = async (task) => {
        const res = await fetch("http://localhost:5000/tasks", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            })
            const data = await res.json();
            setTasks([...tasks, data]);
        // const id = Math.floor(Math.random() * 1000);
        // const new_task = {id, ...task};
        // setTasks([...tasks, new_task]);
        
    }

	// Delete Task
	const deleteTask = async (id) => {
		setTasks(tasks.filter((task) => task.id !== id));

        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE'
        });
        setTasks(tasks.filter((task) => task.id !== id));
	}

	// Toggle Reminder
	const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id);
        const updateTask = {...taskToToggle, reminder : !taskToToggle.reminder}
        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method : 'PATCH',
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(updateTask)
        })
        const data = await res.json();
		setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !data.reminder} : task));
	}
	
    return ( 
		<div className = "container" >
			<Header toggleForm={ () => {setShowAddTask(!showAddTask)}} showAdd = {showAddTask}/>
            {showAddTask && <AddTask onAdd={addTask} />}
			{(tasks.length > 0) ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No tasks to show'}
        </div>
    );
}

export default App;