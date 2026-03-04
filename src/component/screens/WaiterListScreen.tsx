import { useState, useEffect } from "react";
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

export default function WaiterListScreen() {
  const [data, setData] = useState<Schema["Waiter"]["type"][]>([]);

  const fetchData = async () => {
    const { data: items } = await client.models.Waiter.list();
    setData(items);
  };

  useEffect(() => { fetchData(); }, []);

  return <>{JSON.stringify(data)}</>;
}