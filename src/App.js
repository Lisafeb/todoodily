import React from "react";
import "./App.css";
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <div
      className="todo"

    >
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
      </span>
      
      <div>
        <Button variant="outline-success" onClick={() => markTodo(index)}>✓</Button>{' '}
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>
      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!title) return;
    addTodo( 0, title, description, false);
    setTitle("");
    setDescription("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label><b>Add Todo</b></Form.Label>
        <Form.Control type="text" className="input" value={title} onChange={e => setTitle(e.target.value)} placeholder="Add new todo" />
        <Form.Control type="text" className="input" value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe the item" />
      </Form.Group>
      <Button variant="primary mb-3" type="submit">
        Submit
    </Button>
    </Form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    {
      index: 0,
      title: "This is a sample todo",
      description: "This is what an item description should look like",
      isDone: false
    },
    {
      index: 1,
      title: "How about we add another item?",
      description: "And how should we describe it?",
      isDone: false
    },
    {
      index: 2,
      title: "Just for fun, here's another",
      description: "I really don't know what to write under this one",
      isDone: false
    },
    {
      index: 3,
      title: "Ok here's another one, why not!",
      description: "I want to read a new book.",
      isDone: false
    }
  ]);

  const addTodo = (index, title, description, isDone) => {
    index = todos.length;
    const newTodos = [...todos, { index, title, description, isDone }];
    setTodos(newTodos);
    console.log(newTodos)
  };


  const toggleMarking = index => {
    const newTodos = [...todos];
    newTodos[index].isDone
      ? newTodos[index].isDone = false
      : newTodos[index].isDone = true;
    setTodos(newTodos);
  }

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
    console.log(items)
  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todoodily</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          <DragDropContext  onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="todos">
              {(provided) => (
                <ul class="list-unstyled" {...provided.droppableProps} ref={provided.innerRef}>
                  { todos.map((todo, index) => (
                    <Draggable key={todo.title} draggableId={todo.title} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <Card>
                            <Card.Body>
                              <Todo
                                key={index}
                                index={index}
                                todo={todo}
                                markTodo={toggleMarking}
                                removeTodo={removeTodo}
                              />
                            </Card.Body>
                          </Card>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default App;