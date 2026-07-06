// import { betterAuth } from 'better-auth'
// import { pool } from '@/lib/db'

// export const auth = betterAuth({
//   database: pool,
//   baseURL:
//     process.env.BETTER_AUTH_URL ??
//     (process.env.VERCEL_PROJECT_PRODUCTION_URL
//       ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
//       : process.env.VERCEL_URL
//         ? `https://${process.env.VERCEL_URL}`
//         : process.env.V0_RUNTIME_URL),
//   emailAndPassword: {
//     enabled: true,
//     autoSignIn: true,
//   },
//   trustedOrigins: [
//     ...(process.env.V0_RUNTIME_URL ? [process.env.V0_RUNTIME_URL] : []),
//     ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
//     ...(process.env.VERCEL_PROJECT_PRODUCTION_URL
//       ? [`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`]
//       : []),
//   ],
//   session: {
//     expiresIn: 60 * 60 * 24 * 7, // 7 days
//     updateAge: 60 * 60 * 24, // 1 day
//   },
//   ...(process.env.NODE_ENV === 'development'
//     ? {
//         advanced: {
//           // In dev (v0 preview iframe), force cross-site cookies so the
//           // session cookie is stored by the browser.
//           defaultCookieAttributes: {
//             sameSite: 'none' as const,
//             secure: true,
//           },
//         },
//       }
//     : {}),
// })

import { betterAuth } from "better-auth";
import { pool } from "@/lib/db";

export const auth = betterAuth({
  database: pool,
  baseURL:
    process.env.BETTER_AUTH_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : process.env.V0_RUNTIME_URL) ??
    "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  trustedOrigins: [
    "http://localhost:3000",
    ...(process.env.V0_RUNTIME_URL ? [process.env.V0_RUNTIME_URL] : []),
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
    ...(process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? [`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`]
      : []),
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  ...(process.env.V0_RUNTIME_URL
    ? {
        advanced: {
          // Only needed when actually embedded in v0's cross-origin preview
          // iframe. Plain local dev (pnpm dev on localhost) is same-origin
          // and doesn't need — and can break under — this override.
          defaultCookieAttributes: {
            sameSite: "none" as const,
            secure: true,
          },
        },
      }
    : {}),
});
