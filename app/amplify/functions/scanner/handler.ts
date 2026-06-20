// amplify/functions/scanner/handler.ts
import type { Handler } from 'aws-lambda';

export const handler: Handler = async (event) => {
  // هذا هو المدخل الذي سيأتي من الواجهة
  const { targetUrl } = event.arguments;

  // فحص أمني بسيط: التحقق من وجود HTTPS
  const isSecure = targetUrl.startsWith('https');

  return {
    status: "Finished",
    riskLevel: isSecure ? "Low" : "High",
    message: isSecure ? "Site is using HTTPS" : "Warning: Insecure connection"
  };
};
