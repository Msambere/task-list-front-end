import PropTypes from 'prop-types';
import Task from './Task.jsx';
import './TaskList.css';

const TaskList = ({ tasks, toggleComplete, deleteTask}) => {
  const getTaskListJSX = (tasks) => {
    return tasks.map((task) => {
      return (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          isComplete={task.isComplete}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
        />
      );
    });
  };
  return <ul className="tasks__list no-bullet">{getTaskListJSX(tasks)}</ul>;
};

TaskList.propTypes = {
  toggleComplete: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default TaskList;
