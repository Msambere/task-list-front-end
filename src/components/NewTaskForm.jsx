import { useState } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

const NewTaskForm = ({ handleCreateTask }) => {
  const [inputTitle, setInputTitle ] = useState(''); //title state
  const [inputDescription, setInputDescription] = useState(''); //description state
  const handleChangeTitle = (event) => {
    setInputTitle(event.target.value);
  };
  const handleChangeDescription = (event) => {
    setInputDescription(event.target.value);
  };
  return (
    <div className="new-tasks__form">
      <input required placeholder = "Enter Title" type="text" value ={inputTitle} onChange={handleChangeTitle}/>
        <input required placeholder="Enter Description" type="text" value ={inputDescription} onChange={handleChangeDescription}/>
          <button
            className="new-tasks__form--create"
            onClick={() => handleCreateTask({
            title: inputTitle,
            description: inputDescription
           })}
          >
            New Task
        </button>
    </div>
  );
};

NewTaskForm.propTypes = {
    handleCreateTask: PropTypes.func.isRequired,
 
};

export default NewTaskForm;
