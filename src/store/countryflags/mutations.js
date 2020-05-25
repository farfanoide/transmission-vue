export function UPDATE_COUNTRIES_BY_MASK (state, {mask, country})
{
  state.countriesByMask[mask] = country
}
export function CLEAR_COUNTRIES_BY_MASK (state)
{
  state.countriesByMask = {}
}
