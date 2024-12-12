// /app/register/page.tsx

// 'use client';
import z from 'zod';
// import { useRouter } from 'next/navigation';
import authAction from '../actions/authAction';
import SignIn from '@/components/auth/sign-in';

const schema = z.object({
  email: z.string().email('email is invalid'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(3, 'Name must be at least 3 characters'),
});
// http://localhost:3000/api/auth/callback/google?code=4%2F0AeanS0Yl4mwfhR625oaV3nXBXnHnqKGJm6dHm9YQ6rjHDBr3ymZnIhh1j335AHYRshDqHw&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=1&prompt=consent
const RegisterPage = () => {
  // const { push } = useRouter();

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const data = new FormData(e.currentTarget);
  //   const email = data.get('email') as string;
  //   const password = data.get('password') as string;
  //   const name = data.get('name') as string;

  //   await authAction({ email, password, name });

  //   try {
  //     const schemaResult = schema.safeParse({ email, password, name });
  //     if (!schemaResult.success) {
  //       throw new Error(schemaResult.error.errors[0].message);
  //     }

  //     const res = await authAction(schemaResult.data);
  //     if (res && !res?.status) {
  //       // toast error
  //       return;
  //     }
  //     push('/login');
  //   } catch (error) {
  //     console.error(error || 'Something went wrong');
  //   }
  // };

  return (
    <>
    {/* <form onSubmit={handleSubmit} className='flex flex-col gap-4 items-center justify-center h-screen bg-gray-900 text-black'>
      <label htmlFor="name">Name</label>
      <input id="name" name="name" type="text" />
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" />
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" />
      <button type="submit">
        Login
      </button>
    </form> */}
    <SignIn />
    </>
  )
};

export default RegisterPage;