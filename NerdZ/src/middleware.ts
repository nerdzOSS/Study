import { authkitMiddleware } from "@workos-inc/authkit-nextjs";

// lib/auth.ts (server-only)
import { WorkOS } from '@workos-inc/node';
import { createClient } from '@supabase/supabase-js';

export const workos = new WorkOS(process.env.WORKOS_API_KEY!); // Server API key

// Server Supabase client (use service key for admin access)
export const supabaseServer = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!, // Use service role key for server operations
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Helper to get Supabase client with WorkOS session (for server components/API)
export async function getSupabaseWithAuth() {
  // In server components: Use withAuth to get token
  // Full usage below in examples
  return supabaseServer;
}


export default authkitMiddleware({
    'redirectUri': 'http://localhost:3001/callback',
  // Protect all routes by default; allow public ones
  middlewareAuth: {
    enabled: true,
    unauthenticatedPaths: ['/about','/callback','/login','/contact','/features','/help-center','/how-it-works','/role-selection'], // Public routes
  },
});