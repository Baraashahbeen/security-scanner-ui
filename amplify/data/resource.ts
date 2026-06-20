import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { handler } from "../functions/scanner/handler"; // استيراد دالة الـ Lambda

const schema = a.schema({
  // نموذج قاعدة البيانات لتخزين النتائج
  ScanResult: a
    .model({
      targetUrl: a.string().required(),
      status: a.string(),
      riskLevel: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  // تعريف الدالة (الـ Lambda) لتكون قابلة للاستدعاء من الواجهة
  scanFunction: a
    .query()
    .arguments({ targetUrl: a.string() })
    .returns(a.json())
    .handler(a.handler.function(handler)),
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
