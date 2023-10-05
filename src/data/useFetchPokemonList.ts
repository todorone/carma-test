import { useState, useEffect } from 'react'
import { POKEMON_URL, IS_EMULATE_SLOW_INTERNET } from './constants'

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

export type PokemonListDataItem = {
  url: string
  name: string
}
