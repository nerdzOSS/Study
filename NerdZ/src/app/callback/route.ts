import { handleAuth } from '@workos-inc/authkit-nextjs';
import { workos, supabaseServer } from '@/middleware';

export const GET = handleAuth({
  onSuccess: async ({ user }) => {
    try {
      // Check if user exists in profiles table
      const { data: userRole } = await supabaseServer.from('profiles').select('*').eq('workos_user_id', user.id).single();

      if (userRole) {
        // User exists, redirect to dashboard
        // The authkit will handle the redirect based on the user's state
      } else {
        // User doesn't exist, create profile
        const { error } = await supabaseServer.from('profiles').insert({
          workos_user_id: user.id,
        });

        if (error) console.error('Sync error:', error);
      }
    } catch (error) {
      console.error('Callback error:', error);
    }
  },
});