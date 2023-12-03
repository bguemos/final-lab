// TodoForm.js
import React, { useState } from "react";
import { nanoid } from "nanoid";
import { Button } from "@mui/material";

export default function TodoForm(props) {
  const [title, setTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [addedTime, setAddedTime] = useState(null);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleAddClick() {
    setIsAdding(true);
    const currentTime = new Date().toLocaleTimeString();
    setAddedTime(currentTime);
    console.log(addedTime); // Add this line to check the value in the console
  }

  function handleSubmit(e) {
    e.preventDefault();
    const currentTime = new Date().toLocaleTimeString();
    const newTask = {
      title: title,
      completed: false,
      id: nanoid(),
      addedTime: currentTime,
    };
    props.addTask(newTask);
    setTitle("");
    setIsAdding(false);
    setAddedTime(currentTime);
  }

  return (
    <div>
      {isAdding ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleTitleChange}
            placeholder="Add new task.."
            value={title}
          />
          <Button variant="text" type="submit">
            Add
          </Button>
          {addedTime && <div>Task added at: {addedTime}</div>}
        </form>
      ) : (
        <Button variant="contained" onClick={handleAddClick}>
          Add New Task
        </Button>
      )}
    </div>
  );
}
