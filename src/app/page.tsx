import Link from 'next/link'

interface Item {
  name: string
  url: string
}

export default async function Page() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0')
  const data = await res.json()

  return data.results.map((item: Item, i: number) => (
    <div key={item.name}>
      <Link href={`/pokemons/${i + 1}`}>{item.name}</Link>
    </div>
  ))
}
