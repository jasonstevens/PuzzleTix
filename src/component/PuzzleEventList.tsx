import { useState, useEffect } from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

export default function TodoList() {
  const [todos, setTodos] = useState<Schema["PuzzleEvent"]["type"][]>([]);

  const fetchData = async () => {
    const { data: items } = await client.models.PuzzleEvent.list();
    setTodos(items);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createData = async () => {
    await client.models.PuzzleEvent.create({
      name: window.prompt("Event?"),
    });

    fetchData();
  }

  return (
    <div>
      <button onClick={createData}>Create Event</button>
      <ul>
        {todos.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  );
}