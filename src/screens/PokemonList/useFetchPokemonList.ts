import { useState, useEffect } from 'react'
import { sleep, capitalizeString } from '../../utils'

const GRAPHQL_URL = 'https://beta.pokeapi.co/graphql/v1beta'
const IS_EMULATE_SLOW_INTERNET = true

// TODO this is very naive fetch implementation, substitute with React Query
export type PokemonListDataItem = {
  id: number
  name: string
  avatarUrl: string
  posterUrl: string
  heightDecimeters: number
  weightHectograms: number
  abilities: string[]
}

function processPokemonList(payload: any): PokemonListDataItem[] {
  return payload.data.pokemon_v2_pokemon.map((pokemon: any) => {
    const sprites = JSON.parse(pokemon.pokemon_v2_pokemonsprites[0].sprites)

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
      abilities: pokemon.pokemon_v2_pokemonabilities.map(
        (item: any) => item.pokemon_v2_ability.name,
      ),
    }
  })
}

const PAGE_SIZE = 15

const query = `
query PokemonList($offset: Int) {
  pokemon_v2_pokemon(limit: ${PAGE_SIZE}, offset: $offset) {
    name
    id
    height
    weight
    pokemon_v2_pokemonsprites {
      id
      sprites
    }
    pokemon_v2_pokemonitems(limit: 3) {
      id
    }
    pokemon_v2_pokemonabilities {
      pokemon_v2_ability {
        name
      }
    }
  }
}`

export function useFetchPokemonList() {
  // initialising with placeholders data
  const [data, setData] = useState<Array<PokemonListDataItem | null> | undefined>()

  useEffect(() => {
    async function fetchPokemonList(offset = 0) {
      const response = await fetch(GRAPHQL_URL, {
        method: 'post',
        body: JSON.stringify({
          query,
          variables: { offset },
          operationName: 'PokemonList',
        }),
      })
      const data = await response.json()

      if (IS_EMULATE_SLOW_INTERNET) await sleep(2000)

      setData(processPokemonList(data))
    }

    // TODO Add infinite fetching
    fetchPokemonList()
  }, [])

  return data
}
