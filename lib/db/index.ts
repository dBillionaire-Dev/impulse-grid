// import { drizzle } from 'drizzle-orm/node-postgres'
// import { Pool } from 'pg'
// import * as schema from './schema'

// export const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// })

// export const db = drizzle(pool, { schema })

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Force IPv4 resolution. On networks where the OS resolver falls back to
  // NAT64-synthesized IPv6 addresses (common on Ubuntu/WSL with
  // systemd-resolved), Node's own DNS resolution can intermittently fail
  // with EAI_AGAIN even though `nslookup`/`ping` succeed fine. `pg` passes
  // this straight through to Node's `net.connect`, which accepts `family`.
  family: 4,
} as any);

export const db = drizzle(pool, { schema });
