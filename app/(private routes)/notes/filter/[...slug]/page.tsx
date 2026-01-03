import { QueryClient, dehydrate } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/serverApi';
import { NotesByTagNameClient } from './Notes.client';
import { Metadata } from 'next';
type Props = {
  params: Promise<{ slug: string[] }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.join('/');
  const tagName = slug[slug.length - 1];

  return {
    title: `Notes: ${tagName}`,
    description: `Page with selected filters: ${path}`,
    openGraph: {
      title: `Notes: ${tagName}`,
      description: `Page with selected filters: ${path}`,
      url: `https://notehub.com/notes/filter/${path}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Notes: ${tagName}`,
        },
      ],
      type: 'article',
    },
  };
}
export default async function Page({ params }: Props) {
  const initialPage = 1;
  const initialSearch = '';

  const { slug } = await params;
  const tagName = slug[0] === 'all' ? undefined : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', tagName, initialSearch, initialPage],
    queryFn: () => fetchNotes(initialPage, initialSearch, tagName),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesByTagNameClient tagName={tagName} />
    </HydrationBoundary>
  );
}
// registr не виправляє ***** цей Гіт
