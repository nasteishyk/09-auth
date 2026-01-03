'use client';

import { login, type LoginRequest } from '@/lib/api/clientApi';
import css from './SignInPage.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ApiError } from '@/types/api';
import { useAuthStore } from '@/lib/store/authStore';

export default function SignIn() {
  const [error, setError] = useState('');
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);
  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as LoginRequest;

      const user = await login(formValues);

      if (user) {
        setUser(user);
        router.push('/profile');
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Invalid email or password'
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            className={css.input}
            id="email"
            type="email"
            name="email"
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            className={css.input}
            id="password"
            type="password"
            name="password"
            required
          />
        </div>

        <button type="submit" className={css.submitButton}>
          Log in
        </button>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
