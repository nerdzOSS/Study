import { WorkOS } from '@workos-inc/node';
import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { supabaseServer } from '@/middleware';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const { role } = await request.json();

        if (!role || (role !== 'student' && role !== 'teacher')) {
            return NextResponse.json(
                { error: 'Invalid role. Must be "student" or "teacher"' },
                { status: 400 }
            );
        }

        // Get the user from the session using withAuth
        const { user } = await withAuth({ ensureSignedIn: true });

        if (!user) {
            return NextResponse.json(
                { error: 'User not authenticated' },
                { status: 401 }
            );
        }

        // Update the user's role in Supabase
        const { error } = await supabaseServer.from('profiles').update({
            role: role
        }).eq('workos_user_id', user.id);

        if (error) {
            console.error('Error updating user role:', error);
            return NextResponse.json(
                { error: 'Failed to update user role' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'Role updated successfully', role },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error updating user role:', error);
        return NextResponse.json(
            { error: 'Failed to update user role' },
            { status: 500 }
        );
    }
}
