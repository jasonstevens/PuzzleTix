import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Ticket: a.model({
    ticket: a.string(),
    user: a.string(),
    status: a.string(),
  }).authorization((allow) => [allow.guest()]),

  PuzzleEvent: a.model({
    event: a.string(),
    name: a.string(),
    description: a.string(),
    organisation: a.string(),
    url: a.string(),
  }).authorization((allow) => [allow.guest()]),

  Organisation: a.model({
    organisation: a.string(),
    name: a.string(),
    description: a.string(),
  }).authorization((allow) => [allow.guest()]),

  Division: a.model({
    division: a.string(),
    event: a.string(),
    description: a.string(),
    capacity: a.integer(),
  }).authorization((allow) => [allow.guest()]),

  Waiting: a.model({
    division: a.string(),
    user: a.string(),
  }).authorization((allow) => [allow.guest()]),

  Volunteer: a.model({
    eventId: a.integer(),
    firstName: a.string(),
    lastName: a.string(),
    email: a.string(),
    phone: a.string(),
    hasShirt: a.boolean(),
    shirt: a.string(),
    allergies: a.string(),
    comments: a.string(),
    day1: a.boolean(),
    day2: a.boolean(),
    div1: a.boolean(),
    div2: a.boolean(),
    div3: a.boolean(),
  }).authorization((allow) => [allow.guest(), allow.authenticated()]),

  Spectator: a.model({
    eventId: a.integer(),
    firstName: a.string(),
    lastName: a.string(),
    email: a.string(),
    phone: a.string(),
    reason: a.string(),
    comments: a.string(),
    seats: a.integer(),
    displayName: a.boolean(),
  }).authorization((allow) => [allow.guest(), allow.authenticated()]),

  Foundling: a.model({
    userId: a.string(),
    displayName: a.string(),
    lastName: a.string(),
  }).authorization((allow) => [allow.guest(), allow.authenticated()]),

  FoundlingEvent: a.model({
    foundlingId: a.string(),
    eventId: a.string(),
    comments: a.string(),
  }).authorization((allow) => [allow.guest(), allow.authenticated()]),

  FoundlingResponse: a.model({
    foundlingId: a.string(),
    eventId: a.integer(),
    firstName: a.string(),
    lastName: a.string(),
    email: a.string(),
    phone: a.string(),
    reason: a.string(),
    comments: a.string(),
    seats: a.integer(),
  }).authorization((allow) => [allow.guest(), allow.authenticated()]),

});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'identityPool',
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
