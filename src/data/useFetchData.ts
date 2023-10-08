import { useState, useEffect } from 'react'
import { POKEMON_URL, IS_EMULATE_SLOW_INTERNET } from './constants'
import { sleep } from '../utils'

// TODO this is very naive fetch/caching implementation, substitute with React Query
// === Pokemon list ===
export type PokemonListDataItem = {
  url: string
  name: string
}

export function useFetchPokemonList() {
  // initialising with placeholders data
  const [data, setData] = useState<Array<PokemonListDataItem | null>>(() => Array(8).fill(null))

  useEffect(() => {
    async function fetchPokemonList() {
      const response = await fetch(POKEMON_URL)
      const data = await response.json()

      if (IS_EMULATE_SLOW_INTERNET) await sleep(2000)

      setData(data.results)
    }

    fetchPokemonList()
  }, [])

  return data
}

// === Pokemon details ===
export type PokemonDetailsData = {
  id: number
  name: string
  posterUrl: string
  heightDecimeters: number
  weightHectograms: number
  abilities: string[]
}

// TODO Validate with zod and type `serverPayload`
function processPokemonDetails(serverPayload: any): PokemonDetailsData {
  return {
    id: serverPayload.id,
    name: serverPayload.name,
    posterUrl: serverPayload.sprites.other.dream_world.front_default,
    heightDecimeters: serverPayload.height,
    weightHectograms: serverPayload.weight,
    abilities: serverPayload.abilities.map((item: any) => item.ability.name),
  }
}

export function useFetchPokemonDetails(url: string) {
  const [data, setData] = useState<PokemonDetailsData | undefined>(() =>
    pokemonDetailsCache.get(url),
  )

  useEffect(() => {
    if (data !== undefined) return

    async function fetchPokemon() {
      const response = await fetch(url)
      const data = await response.json()

      if (IS_EMULATE_SLOW_INTERNET) await sleep(2000)

      const processedData = processPokemonDetails(data)
      setData(processedData)

      pokemonDetailsCache.set(url, processedData)
    }

    fetchPokemon()
  }, [])

  return data
}

const pokemonDetailsCache = new Map<string, PokemonDetailsData>()
