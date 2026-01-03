import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/serverApi';
import NoteDetailsClient from './NoteDetails.client';
import { Metadata } from 'next';

interface NoteDetailsProp {
  params: Promise<{ id: string }>;
}
export async function generateMetadata({
  params,
}: NoteDetailsProp): Promise<Metadata> {
  const { id } = await params;

  const note = await fetchNoteById(id);
  return {
    title: note.title,
    description: note.content,
    openGraph: {
      title: note.title,
      description: note.content,
      url: `/notes/${id}`,
      images: [
        {
          url: `/note/${id}`,
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    },
  };
}
export default async function NoteDetails({ params }: NoteDetailsProp) {
  const resolved = await params;
  const id = resolved.id;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
