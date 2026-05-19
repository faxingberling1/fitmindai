'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function unlockPlatform(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  if (username === 'donovan' && password === 'admin@54321') {
    const cookieStore = await cookies();
    cookieStore.set('fitmind_global_lock', 'unlocked', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });
    
    // Redirect to home page
    redirect('/');
  } else {
    return { error: 'Invalid credentials. Access denied.' };
  }
}
