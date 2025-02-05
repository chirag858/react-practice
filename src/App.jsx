import { useState } from "react";
import { useEffect } from "react";
import 'font-awesome/css/font-awesome.min.css';
import './app.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [dropdowntasks, setdropdowntasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const taskOptions = ["All", "Completed", "Pending"];
  const [selected, setSelected] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  let [filteredTasks,setfilteredTasks] = useState([]);

  useEffect(() => {
    if (!selected) return;
    if (selected === "Pending") {
      let pendingTasks = tasks.filter(task => !task.isCompleted);
      console.log("Pending tasks:", pendingTasks);
      setfilteredTasks(pendingTasks)
    }
    else if (selected === "Completed") {
      let completedTasks = tasks.filter(task => task.isCompleted);
      console.log("Completed tasks:", completedTasks);
      setfilteredTasks(completedTasks)
    }
    else {
      setfilteredTasks(tasks);
    }
  }, [selected,tasks]); 

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
  
  const handleDeleteTask = (text) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.text !== text));
  };
  
  const handleEditTask = (index) => {
    setInputValue(tasks[index].text);
    setIsEdit(true);
    setEditIndex(index);
  };

  const handleToggleComplete = (text) => {
    console.log(filteredTasks);
    console.log(text);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.text === text ? { ...task, isCompleted: !task.isCompleted } : task
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
              <li key={index} onClick={() => { setSelected(option); setIsOpen(false); }}>
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
        {filteredTasks.map((task, index) => (
          <li key={index} style={{ textDecoration: task.isCompleted ? "line-through" : "none" }}>
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => handleToggleComplete(task.text)}
            />
            {task.text}
            <i
              onClick={() => handleDeleteTask(task.text)}
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
