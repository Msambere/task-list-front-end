import TaskList from './components/TaskList.jsx';
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
  console.log('Start api call');
  let patchURL ='';
  if (taskState === false){
    patchURL = `${kbaseURL}/tasks/${taskID}/mark_complete`;
  }else{
    patchURL = `${kbaseURL}/tasks/${taskID}/mark_incomplete`;
  }
  console.log(patchURL);
  return axios.patch(patchURL)
    .then(response =>{
      const fixedTask = convertTaskData(response.data.task);
      return fixedTask;
    })
    .catch(error =>{console.log(error);});
};

const App = () => {
  const [taskData, setTaskData] = useState([]);

  useEffect(() =>{
    retrieveTaskData();
  }, []);

  const retrieveTaskData = () =>{
    taskDataAPICall()
      .then(data =>{
        const newData = data.map(task =>convertTaskData(task));
        setTaskData(newData);
      });
  };


  const toggleComplete = (taskID) =>{
    const task = taskData.find(task => task.id === taskID);
    const taskState = task.isComplete;
    console.log(taskID, taskState);
    const updatedTask = toggleCompleteAPICall(taskID, taskState);
    setTaskData(tasks => tasks.map(task =>{
      if (task.id === taskID){
        return updatedTask;
      }else{
        return task;
      }
    }));
  };

  const deleteTask = (taskID) =>{
    setTaskData(tasks => tasks.filter(task => task.id != taskID));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div><TaskList tasks={taskData} toggleComplete={toggleComplete} deleteTask={deleteTask}/></div>
      </main>
    </div>
  );
};

export default App;
