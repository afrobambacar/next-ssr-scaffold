'use client'

import { useQuery } from "@tanstack/react-query"

interface Stat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export default function Pokemon({ id }: { id: string }) {
  const { data } = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(res => res.json())
  })

  return (
    <>
      <p>{data.name}</p>
      <ul>
        {data.stats.map((stat: Stat) => (
          <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
        ))}
      </ul>
    </>
  )
}
