import { useState, useEffect } from 'react'
import { POKEMON_URL, IS_EMULATE_SLOW_INTERNET } from './constants'

export type PokemonListDataItem = {
  url: string
  name: string
}

export function useFetchPokemonList() {
  const [data, setData] = useState<Array<PokemonListDataItem | null>>(() => Array(5).fill(null))
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch(POKEMON_URL)
      .then((res: any) => res.json())
      .then(data => {
        setTimeout(
          () => {
            setIsLoading(false)
            setData(data.results)
          },
          IS_EMULATE_SLOW_INTERNET ? 2000 : 0,
        )
      })
  }, [])

  return { data, isLoading }
}

export type PokemonDetails = {
  url: string
  name: string
}

export function useFetchPokemonDetails(url: string) {
  const [data, setData] = useState<Array<PokemonListDataItem | null>>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch(url)
      .then((res: any) => res.json())
      .then(data => {
        setTimeout(
          () => {
            setIsLoading(false)
            setData(data)
          },
          IS_EMULATE_SLOW_INTERNET ? 2000 : 0,
        )
      })
  }, [])

  return { data, isLoading }
}
