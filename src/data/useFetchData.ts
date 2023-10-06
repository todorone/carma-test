import { useState, useEffect } from 'react'
import { POKEMON_URL, IS_EMULATE_SLOW_INTERNET } from './constants'

export type PokemonListDataItem = {
  url: string
  name: string
}

export function useFetchPokemonList() {
  const [data, setData] = useState<Array<PokemonListDataItem | null>>(() => Array(8).fill(null))

  useEffect(() => {
    fetch(POKEMON_URL)
      .then(res => res.json())
      .then(data => {
        setTimeout(
          () => {
            setData(data.results)
          },
          IS_EMULATE_SLOW_INTERNET ? 2000 : 0,
        )
      })
  }, [])

  return { data }
}

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
  const [data, setData] = useState<PokemonDetailsData>()

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setTimeout(
          () => {
            setData(processPokemonDetails(data))
          },
          IS_EMULATE_SLOW_INTERNET ? 2000 : 0,
        )
      })
  }, [])

  return { data }
}
