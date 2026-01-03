'use client';
import css from './SignUpPage.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register, RegisterRequest } from '@/lib/api/clientApi';
import { AxiosError } from 'axios';

import { useAuthStore } from '@/lib/store/authStore';
import { ApiError } from '@/types/api';

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as RegisterRequest;
      const res = await register(formValues);
      if (res) {
        router.push('/profile');
        setUser(res);
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Oops... some error'
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign up</h1>
        <label className={css.formGroup}>
          Email
          <input className={css.input} type="email" name="email" required />
        </label>

        <label className={css.formGroup}>
          Password
          <input
            className={css.input}
            type="password"
            name="password"
            required
          />
        </label>
        <button className={css.submitButton} type="submit">
          Register
        </button>
      </form>
      {error && <p className={css.error}>{error}</p>}
    </main>
  );
};

export default SignUp;
