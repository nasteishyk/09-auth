import Link from 'next/link';
import css from './profilePage.module.css';
import { Metadata } from 'next';
import Image from 'next/image';
import { getServerMe } from '@/lib/api/serverApi';

export const metadata: Metadata = {
  title: 'User Profile',
  description: 'Profile page with user information',
  openGraph: {
    title: 'User Profile',
    description: 'Profile page with user information',
  },
};
export default async function Profile() {
  const user = await getServerMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar ?? '/default-avatar.png'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p className={css.usernameWrapper}>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
