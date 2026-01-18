import { useState, useEffect } from "react";
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

export default function FoundlingEventListScreen() {
  const [data, setData] = useState<Schema["FoundlingEvent"]["type"][]>([]);

  const fetchData = async () => {
    const { data: items } = await client.models.FoundlingEvent.list();
    setData(items);
  };

  useEffect(() => { fetchData(); }, []);

  return <>{JSON.stringify(data)}</>;
}