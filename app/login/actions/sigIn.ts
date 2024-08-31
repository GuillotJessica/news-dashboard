'use server';
import { signIn } from '@/app/auth';
import { createUser, getUser } from '@/app/db';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const signInCredential = async (
  _: {
    message: string;
  },
  formData: FormData,
) => {
  try {
    const [email, password] = [formData.get('email') as string, formData.get('password') as string];
    const signUpSchema = z.object({
      email: z.string().email(),
      password: z.string().min(1, 'Password must be filled'),
    });
    const result = signUpSchema.safeParse({
      email,
      password,
    });
    if (!result.success) {
      return {
        message: Object.values(result.error.flatten().fieldErrors)
          .map((error) => error[0])
          .join('\n'),
      };
    }
    await signIn('credentials', {
      redirectTo: '/news',
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { message: 'Invalid credentials!' };
        default:
          return { message: 'Something went wrong!' };
      }
    }
    throw error;
  }
};

export const register = async (
  _: {
    message: string;
  },
  formData: FormData,
) => {
  try {
    let email = formData.get('email') as string;
    let password = formData.get('password') as string;
    const signUpSchema = z.object({
      email: z.string().email(),
      password: z.string().min(6, 'Password must contain at least 6 characters'),
    });
    const result = signUpSchema.safeParse({
      email,
      password,
    });
    if (!result.success) {
      return {
        message: Object.values(result.error.flatten().fieldErrors)
          .map((error) => error[0])
          .join('\n'),
      };
    }
    let user = await getUser(email);
    if (user.length > 0) {
      return { message: 'User already exists' };
    }
    await createUser(email, password);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { message: 'Invalid credentials!' };
        default:
          return { message: 'Something went wrong!' };
      }
    }
    // In Server Actions and Route Handlers, redirect should be called after the try/catch block.
    // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component:~:text=In%20Server%20Actions%20and%20Route%20Handlers%2C%20redirect%20should%20be%20called%20after%20the%20try/catch%20block.
  }
  redirect('/login');
};
