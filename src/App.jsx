import { useState } from "react";
import 'font-awesome/css/font-awesome.min.css';
import './app.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const taskOptions = ["All", "Completed", "Pending"];
  const [selected, setSelected] = useState("Select an option");
  const [isOpen, setIsOpen] = useState(false);
  const handleDropdownTask = (option) => {
    if(option == "All"){
      
    }

  }
  const handleAddOrEditTask = () => {
    if (inputValue.trim() === "") return;

    if (isEdit) {
      setTasks((prevTasks) =>
        prevTasks.map((task, index) =>
          index === editIndex ? { ...task, text: inputValue } : task
        )
      );
      setIsEdit(false);
    } else {
      setTasks((prevTasks) => [...prevTasks, { text: inputValue, isCompleted: false }]);
    }

    setInputValue("");
  };

  const handleDeleteTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const handleEditTask = (index) => {
    setInputValue(tasks[index].text);
    setIsEdit(true);
    setEditIndex(index);
  };

  const handleToggleComplete = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddOrEditTask();
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div className="dropdown">
        <button onClick={() => setIsOpen(!isOpen)}>{selected} ▼</button>
        {isOpen && (
          <ul>
            {taskOptions.map((option, index) => (
              <li key={index} onClick={() => { setSelected(option); setIsOpen(false);handleDropdownTask(option) }}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
      <input
        className="input-text"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Enter a task..."
      />
      <button onClick={handleAddOrEditTask}>
        {isEdit ? "Save Task" : "Add Task"}
      </button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index} style={{ textDecoration: task.isCompleted ? "line-through" : "none" }}>
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => handleToggleComplete(index)}
            />
            {task.text}
            <i
              onClick={() => handleDeleteTask(index)}
              className="fa-solid fa-trash"
              style={{ marginLeft: "10px", cursor: "pointer", color: "red" }}
            ></i>
            <i
              onClick={() => handleEditTask(index)}
              className="fa-solid fa-pen-to-square"
              style={{ marginLeft: "10px", cursor: "pointer", color: "blue" }}
            ></i>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
