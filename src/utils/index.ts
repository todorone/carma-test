import { useState } from 'react'

export function usePopup<TProps>() {
  const [props, setProps] = useState<TProps | null>(null)

  return {
    openPopup: (props: TProps) => {
      setProps(props)
    },
    closePopup: () => {
      setProps(null)
    },
    props,
    isPopupVisible: props !== null,
  }
}

export function capitalizeString(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
