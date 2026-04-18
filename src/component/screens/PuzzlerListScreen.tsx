import { useState, useEffect } from "react";
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

export default function PuzzlerListScreen() {
  const [data, setData] = useState<Schema["Puzzler"]["type"][]>([]);

  const fetchData = async () => {
    const { data: items } = await client.models.Puzzler.list();
    setData(items);
  };

  useEffect(() => { fetchData(); }, []);

  return <>{JSON.stringify(data)}</>;
}