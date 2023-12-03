import React, { useState, useEffect } from "react";
import "../styles.css";
import { Button } from "@mui/material";

export default function Todo(props) {
  const { todo, removeTask, toggleCompleted } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskText, setEditTaskText] = useState(todo.title);
  const [checkedTime, setCheckedTime] = useState(null);
  const [startedTime, setStartedTime] = useState(null);

  useEffect(() => {
    // Update checkedTime when todo.completed changes
    if (todo.completed) {
      setCheckedTime(new Date().toLocaleTimeString());
    }
  }, [todo.completed]);

  function handleDelete() {
    removeTask(todo);
  }

  function handleToggle() {
    const currentTime = new Date().toLocaleTimeString();
    if (!todo.completed && !startedTime) {
      // Set startedTime if the task is being started
      setStartedTime(currentTime);
    }
    toggleCompleted(todo);
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function handleSaveEdit() {
    const updatedTask = { ...todo, title: editTaskText };
    setEditTaskText(updatedTask.title);
    setIsEditing(false);
  }

  function handleCancelEdit() {
    setIsEditing(false);
  }

  return (
    <li className="check">
      <span>
        {isEditing ? (
          <input
            type="text"
            value={editTaskText}
            onChange={(e) => setEditTaskText(e.target.value)}
          />
        ) : (
          <>
            {todo.completed === true ? (
              <>
                <del> {editTaskText}</del>
                <div>Completed at: {checkedTime}</div>
              </>
            ) : (
              <>
                <span>{editTaskText}</span>
                {startedTime && <div>Started at: {startedTime}</div>}
              </>
            )}
          </>
        )}
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
        />
      </span>
      <div>
        {isEditing ? (
          <>
            <Button variant="text" onClick={handleSaveEdit}>
              Save
            </Button>
            <Button variant="text" onClick={handleCancelEdit}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button variant="contained" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="contained" onClick={handleDelete}>
              Remove
            </Button>
          </>
        )}
      </div>
    </li>
  );
}
