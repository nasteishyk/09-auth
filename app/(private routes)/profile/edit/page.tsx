'use client';

import { useState } from 'react';
import { updateMe } from '@/lib/api/clientApi';
import Image from 'next/image';
import css from './EditPage.module.css';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

export default function EditProfile() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [userName, setUserName] = useState(user?.username);

  if (!user) {
    if (typeof window !== 'undefined') {
      router.push('/sign-in');
    }
    return null;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (formData: FormData) => {
    const newUsername = formData.get('username') as string;
    const updatedUser = await updateMe({ username: newUsername });
    setUser(updatedUser);
    router.push('/profile');
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit profile</h1>
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        ) : (
          <div className={css.avatarPlaceholder}>No avatar</div>
        )}
        <form action={handleSaveUser} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              value={userName}
              onChange={handleChange}
            />
          </div>
          <p>Email: {user?.email}</p>
          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
