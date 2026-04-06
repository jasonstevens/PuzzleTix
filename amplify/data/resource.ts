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

  Waiter: a.model({
    eventId: a.integer(),
    firstName: a.string(),
    lastName: a.string(),
    email: a.string(),
    phone: a.string(),
    comments: a.string(),
    div1: a.boolean(),
    div2: a.boolean(),
    div3: a.boolean(),
  }).authorization((allow) => [allow.guest(), allow.authenticated("identityPool")]),


  Foundling: a.model({
    loginId: a.string().required(),
    displayName: a.string(),
    firstName: a.string(),
    lastName: a.string(),
    performance: a.string(),
    goal: a.string(),
    foundlingEvents: a.hasMany('FoundlingEvent', 'foundlingId'),
    foundlingResponses: a.hasMany('FoundlingResponse', 'responderId')
  })
    .secondaryIndexes((index) => [index("loginId")])
    .authorization((allow) => [allow.guest(), allow.authenticated("identityPool")]),

  FoundlingEvent: a.model({
    foundlingId: a.id().required(),
    eventId: a.integer().required(),
    seeking: a.string(),
    pair: a.boolean(),
    team: a.boolean(),
    comments: a.string(),
    status: a.string(),
    pairGoal: a.string(),
    teamGoal: a.string(),
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
    comments: a.string(),
    foundling: a.belongsTo('Foundling', 'responderId')
  })
    .secondaryIndexes((index) => [
      index("eventId").queryField("listFoundlingResponsesByEvent"),
      index("foundlingId").queryField("listFoundlingResponsesByFoundling")]

    )
    .authorization((allow) => [allow.guest(), allow.authenticated("identityPool")]),

  Puzzler: a.model({
    loginId: a.string().required(),
    preferredName: a.string().required(),
    instagram: a.string(),
    mySpeedPuzzling: a.string(),
    eligible: a.boolean(),
    country: a.string(),
    otherCountry: a.string(),
    firstEvent: a.boolean(),
    firstEventName: a.string(),
    youtube: a.string(),
    favouriteArtist: a.string(),
    favouriteStyle: a.string(),
    favouriteDivision: a.string(),
    favouriteCritter: a.string(),
    puzzlerTeam: a.hasMany('PuzzlerTeam', 'loginId'),
  })
    .secondaryIndexes((index) => [index("loginId")])
    .authorization((allow) => [allow.guest(), allow.authenticated("identityPool")]),

  PuzzlerTeam: a.model({
    loginId: a.id().required(),
    teamId: a.id().required(),
    teamName: a.string().required(),
    eventId: a.integer().required(),
    member1: a.string().required(),
    member2: a.string(),
    member3: a.string(),
    member4: a.string(),
    comments: a.string(),
    puzzler: a.belongsTo('Puzzler', 'loginId')
  })
    .secondaryIndexes((index) => [
      index("loginId").queryField("listTeamByPuzzler")]
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