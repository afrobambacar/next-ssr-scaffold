interface Stat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export default async function Page ({ params }: { params: Promise<{ id: string }>}) {
  const { id } = await params
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
  const data = await res.json()

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