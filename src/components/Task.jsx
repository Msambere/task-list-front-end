import { useState } from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete, toggleComplete, deleteTask }) => {
  const handleCompleteToggle = () => toggleComplete(id);
  const handleDeleteTask = () => deleteTask(id);

  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={handleCompleteToggle}
      >
        {title}
      </button>
      <button
        className="tasks__item__remove button"
        onClick={handleDeleteTask}
      >
          x
      </button>
    </li>
  );
};

Task.propTypes = {
  toggleComplete: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
};

export default Task;
