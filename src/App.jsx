import { useState } from "react";
import { useEffect } from "react";
import 'font-awesome/css/font-awesome.min.css';
import './app.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CalendarIcon from './Calender';


function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const taskOptions = ["All", "Completed", "Pending"];
  const [selected, setSelected] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  let [filteredTasks,setfilteredTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

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
    if (!isEdit && tasks.some(task => task.text === inputValue)) {
      alert("Task already exists!");
      return;
    }
    if (isEdit) {
      setTasks((prevTasks) =>
        prevTasks.map((task, index) =>
          index === editIndex ? { ...task, text: inputValue,dateToPerform : selectedDate } : task
        )
      );

      setIsEdit(false);
    } else {
      setTasks((prevTasks) => [...prevTasks, { text: inputValue, isCompleted: false,dateToPerform : selectedDate }]);

    }

    setInputValue("");
  };
  
  const handleDeleteTask = (text) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.text !== text));
  };
  
  const handleEditTask = (text) => {
    setInputValue(text);
    setIsEdit(true);
    const index = tasks.findIndex(item => item.text === text);
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
  const handleDateSelect = (date) => {
    console.log("Date changed to :",date);
    setSelectedDate(date);
  };


  return (
    <div style={{width : "800px"}}>
      <div style={{display:'flex',alignItems: 'center',justifyContent: 'space-between'}}>

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
      <CalendarIcon onDateSelect={handleDateSelect} />
      </div>

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
              onClick={() => handleEditTask(task.text)}
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
