"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

const TodoApp = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchTodos();
    }
  }, []);

  const fetchTodos = async () => {
    const { data, error } = await supabase.from("todos").select("*");

    if (error) console.error("Error fetching todos:", error.message);
    else setTodos(data);
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    const { data, error } = await supabase
      .from("todos")
      .insert([{ task: newTodo, is_complete: false }])
      .select();

    if (error) {
      console.error("Error adding todo:", error.message);
    } else {
      setNewTodo("");
      setTodos((prevTodos) => [...prevTodos, ...data]);
    }
  };

  const deleteTodo = async (id) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (error) {
      console.error("Error deleting todo:", error.message);
    } else {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="todo-input">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.is_complete ? "completed" : ""}>
            <span>{todo.task}</span>
            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .container {
          text-align: center;
          padding: 20px;
          max-width: 400px;
          margin: auto;
        }
        .todo-input {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        input {
          flex: 1;
          padding: 8px;
          border: 1px solid #ccc;
        }
        button {
          padding: 8px 12px;
          cursor: pointer;
          background: #0070f3;
          color: white;
          border: none;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          border: 1px solid #ccc;
          margin: 5px 0;
          cursor: pointer;
        }
        .completed {
          text-decoration: line-through;
          color: gray;
        }
      `}</style>
    </div>
  );
};

export default TodoApp;
