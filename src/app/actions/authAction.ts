// /app/register/action.ts

'use server';

import { db } from '@/db/config';
import { users } from '@/db/schema/users';
import { nanoid } from 'nanoid';

type TFormData = {
  email: string;
  password: string;
  name: string;
};

const authAction = async (formData: TFormData) => {
  const isAlreadyRegistered = (await db.select().from(users)).find(
    (user) => user.email === formData.email
  );

  if (isAlreadyRegistered) {
    return {
      message: 'Email already registered',
      status: false,
    };
  }

  // await db.insert(users).values({
  //   ...formData,
  // });
  console.log("formData", formData);

  return {
    message: 'User registered successfully',
    status: true,
  };
};

export default authAction;