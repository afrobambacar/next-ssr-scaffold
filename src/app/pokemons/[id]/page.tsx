import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import Pokemon from './pokemon'

export default async function Page ({ params }: { params: Promise<{ id: string }>}) {
  const { id } = await params
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['pokemon', id],
    queryFn: () => fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(res => res.json())
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Pokemon id={id} />
    </HydrationBoundary>
  )
}