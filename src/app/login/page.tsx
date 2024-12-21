
import SignIn from '@/components/auth/sign-in';
import { Suspense } from 'react';

const RegisterPage = () => {
  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
    <SignIn />
    </Suspense>
    </>
  )
};

export default RegisterPage;