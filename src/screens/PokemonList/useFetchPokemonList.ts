import { useState, useEffect } from 'react'
import { GRAPHQL_URL, IS_EMULATE_SLOW_INTERNET } from './constants'
import { sleep, capitalizeString } from '../../utils'

// TODO this is very naive fetch/caching implementation, substitute with React Query
// === Pokemon list ===
export type PokemonListDataItem = {
  id: number
  name: string
  avatarUrl: string
  posterUrl: string
  heightDecimeters: number
  weightHectograms: number
  // abilities: string[]
}

function processPokemonList(payload: any): PokemonListDataItem[] {
  return payload.data.pokemon_v2_pokemon.map((pokemon: any) => {
    const sprites = JSON.parse(pokemon.pokemon_v2_pokemonsprites[0].sprites)
    console.log('sprites', sprites)
    return {
      id: pokemon.id,
      name: capitalizeString(pokemon.name),
      // TODO GraphQL doesn't generate accurate sprite urls, temporary hack fix
      avatarUrl: sprites.front_default.replace(
        '/media',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master',
      ),
      // TODO GraphQL doesn't generate accurate sprite urls, temporary hack fix
      posterUrl: sprites.other.dream_world.front_default.replace(
        '/media',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master',
      ),
      heightDecimeters: pokemon.height,
      weightHectograms: pokemon.weight,
      // abilities: serverPayload.abilities.map((item: any) => item.ability.name),
    }
  })
}

export function useFetchPokemonList() {
  // initialising with placeholders data
  const [data, setData] = useState<Array<PokemonListDataItem | null>>(() => Array(8).fill(null))

  useEffect(() => {
    async function fetchPokemonList() {
      const response = await fetch(GRAPHQL_URL, {
        method: 'post',
        body: JSON.stringify({
          query:
            'query samplePokeAPIquery {\n  pokemon_v2_pokemon(limit: 10) {\n    name\n    id\n    height\n    weight\n    pokemon_v2_pokemonsprites {\n      id\n      sprites\n    }\n    pokemon_v2_pokemonitems(limit: 3) {\n      pokemon_v2_item {\n        name\n        id\n        cost\n      }\n      id\n    }\n  }\n}\n',
          variables: null,
          operationName: 'samplePokeAPIquery',
        }),
      })
      const data = await response.json()

      if (IS_EMULATE_SLOW_INTERNET) await sleep(2000)

      setData(processPokemonList(data))
    }

    fetchPokemonList()
  }, [])

  return data
}
