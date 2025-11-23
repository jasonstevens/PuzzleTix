import { useState, useEffect } from "react";
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

export default function VolunteerListScreen() {
  const [data, setData] = useState<Schema["Volunteer"]["type"][]>([]);

  const fetchData = async () => {
    const { data: items } = await client.models.Volunteer.list();
    setData(items);
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <>{JSON.stringify(data)}</>
  );
}