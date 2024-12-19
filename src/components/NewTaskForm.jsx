import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

const NewTaskForm = ({submitNewTask}) => {
  const [taskDetails, setTaskDetails] = useState({title: '', description: ''});

  const handleFormValuesChange = (event) =>{
    const propertyName = event.target.name;
    setTaskDetails({...taskDetails, [propertyName]: event.target.value});
  };

  const handleSubmit = (event) =>{
    event.preventDefault();
    const newTask ={
      title: taskDetails.title,
      description: taskDetails.description,
    };
    submitNewTask(newTask);
    setTaskDetails({title: '', description: ''});
  };

  return (
    <section>
      <h1>New Task Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Task Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder='Enter Task Title'
            onChange={handleFormValuesChange}
            value={taskDetails.title}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Task Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder='Enter Task Description'
            onChange={handleFormValuesChange}
            value={taskDetails.description}
            required
          />
        </div>
        <div>
          <input type="submit" value ='Add a New Task' />
        </div>
      </form>
    </section>
  );
};

NewTaskForm.propTypes = {
  submitNewTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
