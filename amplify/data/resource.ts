import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  ScanResult: a
    .model({
      targetUrl: a.string().required(),
      status: a.string(),
      riskLevel: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
