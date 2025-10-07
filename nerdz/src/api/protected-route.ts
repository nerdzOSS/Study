// `/api/protected-route.ts`
import { createClient } from '@/utils/supabase/client';
export default async function handler(req, res) {
    const supabase = createClient();
    const {data,error} = await supabase.auth.getUser();
    if (!data || error) return res.status(401).json({ error: 'Unauthorized' });
  // Proceed with protected logic
  res.status(200).json({ data });
}
