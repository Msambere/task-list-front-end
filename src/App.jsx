import TaskList from './components/TaskList.jsx';
import NewTaskForm from './components/NewTaskForm.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
const kbaseURL = 'http://localhost:5000';

const taskDataAPICall = () =>{
  return axios.get(`${kbaseURL}/tasks`)
    .then(response =>{
      return response.data;
    });
};

const convertTaskData = (task) =>{
  let fixedTask = {...task, isComplete: task.is_complete};
  delete fixedTask.is_complete;
  return fixedTask;
};

const toggleCompleteAPICall = (taskID, taskState) =>{
  let patchURL ='';
  if (taskState === false){
    patchURL = `${kbaseURL}/tasks/${taskID}/mark_complete`;
  }else{
    patchURL = `${kbaseURL}/tasks/${taskID}/mark_incomplete`;
  }
  return axios.patch(patchURL)
    .then(response =>{
      return response.data;
    })
    .catch(error =>{console.log(error);});
};

const deleteTaskAPICall = (taskID) =>{
  return axios.delete(`${kbaseURL}/tasks/${taskID}`)
    .then(response =>{
      return response.data;
    })
    .catch(error =>{console.log(error);});
};

const createTaskAPICall = (newTask) =>{
  return axios.post(`${kbaseURL}/tasks`,newTask)
    .then(response =>{
      return response.data;
    })
    .catch(error =>{console.log(error);});
};

const App = () => {
  const [taskData, setTaskData] = useState([
    {
      id: 1,
      title: 'task one',
      isComplete: false,
    },
    {
      id: 42,
      title: 'task 2',
      isComplete: true,
    },
  ]);

  const retrieveTaskData = () =>{
    taskDataAPICall()
      .then(data =>{
        const newData = data.map(task =>convertTaskData(task));
        setTaskData(newData);
      });
  };

  useEffect(() =>{
    retrieveTaskData();
  }, []);



  const toggleComplete = (taskID) =>{
    const task = taskData.find(task => task.id === taskID);
    const taskState = task.isComplete;
    toggleCompleteAPICall(taskID, taskState)
      .then(response =>{
        const updatedTask = convertTaskData(response.task);
        setTaskData(tasks => tasks.map(task =>{
          if (task.id === updatedTask.id){
            return updatedTask;
          }else{
            return task;
          }
        }));
      });
  };

  const deleteTask = (taskID) =>{
    deleteTaskAPICall(taskID)
      .then(response =>{
        console.log(response);
        // setTaskData(tasks => tasks.filter(task => task.id != taskID));
        retrieveTaskData();
      });
  };
  const createTask = (newTask) =>{    
    createTaskAPICall(newTask)
    .then(response =>{
      console.log(response);
      retrieveTaskData();
    });
    
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <NewTaskForm handleCreateTask={createTask}/>
      <main>
        <div>
          <TaskList tasks={taskData} toggleComplete={toggleComplete} deleteTask={deleteTask}/>
        </div>
      </main>
    </div>
  );
};

export default App;
