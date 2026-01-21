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
    id: a.id().required(),
    loginId: a.string().required(),
    displayName: a.string(),
    firstName: a.string(),
    lastName: a.string(),
    performance: a.string(),
    goal: a.string(),
    foundlingEvents: a.hasMany('FoundlingEvent', 'foundlingId')
  })
    .secondaryIndexes((index) => [index("loginId")])
    .authorization((allow) => [allow.guest(), allow.authenticated("identityPool")]),

  FoundlingEvent: a.model({
    id: a.id().required(),
    foundlingId: a.id().required(),
    eventId: a.integer().required(),
    seeking: a.string(),
    pair: a.boolean(),
    team: a.boolean(),
    comments: a.string(),
    foundling: a.belongsTo('Foundling', 'foundlingId')
  })
    .secondaryIndexes((index) => [
      index("foundlingId").sortKeys(["eventId"]).queryField("listFoundlingEventsByFoundling"),
      index("eventId").queryField("listFoundlingEventsByEvent")
    ])
    .authorization((allow) => [allow.guest(), allow.authenticated("identityPool")]),

  FoundlingResponse: a.model({
    foundlingId: a.id().required(),
    foundlingEventId: a.id().required(),
    eventId: a.integer().required(),
    responderId: a.id().required(),
    comments: a.string()
  })
    .secondaryIndexes((index) => [
      index("eventId").queryField("listFoundlingResponsesByEvent"),
      index("foundlingId").queryField("listFoundlingResponsesByFoundling")]

    )
    .authorization((allow) => [allow.guest(), allow.authenticated("identityPool")]),

});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'identityPool',
  },
});