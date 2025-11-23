import { useState, useEffect } from "react";
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

export default function VolunteerListScreen() {
  const [data, setData] = useState<Schema["PuzzleEvent"]["type"][]>([]);

  const fetchTodos = async () => {
    const { data: items } = await client.models.PuzzleEvent.list();
    setData(items);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <ul>
        {data.map(({ id, name }) => (
          <li key={id}>{id} {name}</li>
        ))}
      </ul>
    </div>
  );
}