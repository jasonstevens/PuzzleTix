
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEffect } from "react";

import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json';
import { teamData } from "../data/BaseTeam";

Amplify.configure(outputs)

const client = generateClient<Schema>();

type PT = {
  teamName: string;
  member1: string;
  loginId: string;
  eligible?: boolean;
}

export default function PuzzlerTeamScreen() {

  useEffect(() => {


    console.log("Update")

    teamData.map(team => {
      store(team);
    });

    // const x: PT = {
    //   teamName: 'Woowee',
    //   member1: 'Bruce',
    //   loginId: 's.e.mievolved@gmail.com',

    // }

    // store(x);

  }, []);

  const store = async (team: PT) => {
    console.log("Storing.....")
    client.models.PuzzlerTeam.create(team);
  }

  return (
    <>
      Upload Screen
    </>
  );
};
