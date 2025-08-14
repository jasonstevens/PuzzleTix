import { useState, useEffect } from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

export default function TodoList() {
  const [todos, setTodos] = useState<Schema["PuzzleEvent"]["type"][]>([]);

  const fetchTodos = async () => {
    const { data: items } = await client.models.PuzzleEvent.list();
    setTodos(items);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const createTodo = async () => {
    await client.models.PuzzleEvent.create({
      name: window.prompt("Event?"),
    });

    fetchTodos();
  }

  return (
    <div>
      <button onClick={createTodo}>Create Event</button>
      <ul>
        {todos.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  );
}