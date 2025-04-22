import type { Sponsor } from '../../site/server/sponsors'

export const getSponsor = async (): Promise<Sponsor> => {
  const response = await fetch('https://xg.benallfree.com/api/sponsor')
  if (!response.ok) {
    return { name: 'benallfree', tagline: 'Dank vibr' }
  }
  return response.json()
}
