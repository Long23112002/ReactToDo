import React, { useState } from "react";
import { Button, Container, Form, Nav, Tab } from "react-bootstrap";
import Swal from "sweetalert2";
const Todolist = () => {
  const [activeKey, setActiveKey] = useState("all");
  const [listTodo, setListTodo] = useState([]);
  const [taskText, setTaskText] = useState("");

  const handleTabSelect = (key) => {
    setActiveKey(key);
  };

  const centerTabsStyle = {
    display: "flex",
    justifyContent: "center",
    height: "100vh",
  };

  const rightTabPaneStyle = {
    maxWidth: "600px",
  };

  const marginInput = {
    margin: "20px 0",
  };


  const listStyle = {
    listStyleType: "none",
    padding: 0, 
  };
  
  const listItemStyle = {
    margin: "10px 0",
  };
  
  const checkboxStyle = {
    margin: "0 5px 0 0", 
  };
  
  const deleteButtonStyle = {
    margin: "0 0 0 5px", 
    background: "red",
    color: "white",
    border: "none",
    cursor: "pointer",
  };

  const handleAddTask = () => {
    if (taskText) {
      const newTask = {
        text: taskText,
        status: activeKey === "complete" ? "complete" : "active",
      };
      setListTodo([...listTodo, newTask]);
      setTaskText("");
      localStorage.setItem("listTodo", JSON.stringify([...listTodo, newTask]));
      Swal.fire("Success", "Task added successfully!", "success");
    }
  };

  const toggleTaskStatus = (index) => {
    const updatedList = [...listTodo];
    updatedList[index].status =
      updatedList[index].status === "complete" ? "active" : "complete";
    setListTodo(updatedList);
  };

  const handleDeleteTask = (index) => {
    // Show a SweetAlert confirmation modal
    Swal.fire({
      title: "Delete Task",
      text: "Are you sure you want to delete this task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedList = [...listTodo];
        updatedList.splice(index, 1);
        setListTodo(updatedList);
        localStorage.setItem("listTodo", JSON.stringify(updatedList));
      }
    });
  };

  return (
    <div style={centerTabsStyle}>
      <Container style={rightTabPaneStyle}>
        <h1 className="text-center">Todo List</h1>

        <Tab.Container
          id="todo-tabs"
          activeKey={activeKey}
          onSelect={handleTabSelect}
        >
          <Nav variant="tabs" className="justify-content-center">
            <Nav.Item>
              <Nav.Link eventKey="all">All</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="active">Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="complete">Complete</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="all" style={rightTabPaneStyle}>
              <Form>
                <Form.Group className="d-flex" style={marginInput}>
                  <Form.Control
                    type="text"
                    placeholder="Enter a new task"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                  />
                  <Button
                    variant="primary"
                    type="button"
                    onClick={handleAddTask}
                  >
                    Add
                  </Button>
                </Form.Group>
              </Form>
              <ul style={listStyle} >
                {listTodo.map((task, index) => (
                  <li key={index} style={ listItemStyle} >
                    <input
                      type="checkbox"
                      checked={task.status === "complete"}
                      onChange={() => toggleTaskStatus(index)}
                      style={checkboxStyle}
                    />
                    {task.text} ({task.status})
                    <button style={deleteButtonStyle} onClick={() => handleDeleteTask(index)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </Tab.Pane>
            <Tab.Pane eventKey="active" style={rightTabPaneStyle}>
              <Form>
                <Form.Group className="d-flex" style={marginInput}>
                  <Form.Control
                    type="text"
                    placeholder="Enter a new task"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                  />
                  <Button
                    variant="primary"
                    type="button"
                    onClick={handleAddTask}
                  >
                    Add
                  </Button>
                </Form.Group>
              </Form>
              <ul style={listStyle}>
                {listTodo
                  .filter((task) => task.status === "active")
                  .map((task, index) => (
                    <li key={index} style={listItemStyle}>
                      <input
                        type="checkbox"
                        checked={task.status === "complete"}
                        onChange={() => toggleTaskStatus(index)}
                        style={checkboxStyle}
                      />
                      {task.text} ({task.status})
                      <button style={deleteButtonStyle} onClick={() => handleDeleteTask(index)}>
                        Delete
                      </button>
                    </li>
                  ))}
              </ul>
            </Tab.Pane>
            <Tab.Pane eventKey="complete" style={rightTabPaneStyle}>
              <Form>
                <Form.Group className="d-flex" style={marginInput}>
                  <Form.Control
                    type="text"
                    placeholder="Enter a new task"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                  />
                  <Button
                    variant="primary"
                    type="button"
                    onClick={handleAddTask}
                  >
                    Add
                  </Button>
                </Form.Group>
              </Form>
              <ul style={listStyle} >
                {listTodo
                  .filter((task) => task.status === "complete")
                  .map((task, index) => (
                    <li key={index} style={listItemStyle}>
                      <input
                        type="checkbox"
                        checked={task.status === "complete"}
                        onChange={() => toggleTaskStatus(index)}
                        style={checkboxStyle}
                      />
                      {task.text} ({task.status})
                      <button style={deleteButtonStyle} onClick={() => handleDeleteTask(index)}>
                        Delete
                      </button>
                    </li>
                  ))}
              </ul>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </div>
  );
};

export default Todolist;
