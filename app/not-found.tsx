import css from './not-found.module.css';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Сторінку не знайдено — 404',
  description:
    'Ця сторінка не існує. Можливо, ви перейшли за неправильним посиланням або сторінку було видалено.',
  openGraph: {
    title: 'Сторінку не знайдено — 404',
    description:
      'Ця сторінка не існує. Можливо, ви перейшли за неправильним посиланням або сторінку було видалено.',
    url: '/not-found',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub 404 Open Graph Image',
      },
    ],
  },
};
const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
