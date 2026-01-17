import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

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
  }).authorization((allow) => [allow.guest(), allow.authenticated("identityPool")]),

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
  }).authorization((allow) => [allow.guest(), allow.authenticated("identityPool")]),

  Foundling: a.model({
    loginId: a.string().required(),
    displayName: a.string(),
    firstName: a.string(),
    lastName: a.string(),
    performance: a.string(),
    goal: a.string(),
  })
    .secondaryIndexes((index) => [index("loginId")])
    .authorization((allow) => [allow.guest(), allow.authenticated("identityPool")]),

  FoundlingEvent: a.model({
    foundlingId: a.id().required(),
    eventId: a.string().required(),
    seeking: a.string(),
    comments: a.string(),
  }).authorization((allow) => [allow.guest(), allow.authenticated("identityPool")]),

  FoundlingResponse: a.model({
    foundlingId: a.id(),
    eventId: a.integer(),
    responderId: a.id(),
    comments: a.string(),
    contact: a.string()
  }).authorization((allow) => [allow.guest(), allow.authenticated("identityPool")]),

});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'identityPool',
  },
});