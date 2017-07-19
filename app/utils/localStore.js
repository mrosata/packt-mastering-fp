import { IOContainer } from 'utils/containers'

// setItem :: (Str, *) -> IOContainer
export const setItem = (key, val) => {
  return IOContainer.of(() => {
    localStorage.setItem(key, JSON.stringify(val))
  })
}


// getItem :: Str -> IOContainer
export const getItem = (itemKey) => IOContainer
  .of(() => localStorage.getItem(itemKey))

