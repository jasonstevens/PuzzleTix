
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEffect } from "react";

import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json';

Amplify.configure(outputs)

const client = generateClient<Schema>();

export default function PuzzlerTeamScreen() {

  useEffect(() => { submit(); }, []);

  const submit = async () => {

    console.log("Update")

    const { data, errors } = await client.models.PuzzlerTeam.create({
      loginId: 's.emievolved@gmail.com',
      teamName: 'Goat Herders',
      member1: 'Jason Stevens',
    });

    console.log(data);
    console.log(errors);

  }

  return (
    <>
      Upload Screen
    </>
  );
};
