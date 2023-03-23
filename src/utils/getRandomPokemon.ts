'use client';

const MAX_DEX_ID = 493;

export const getRandomPokemon: (shouldSkip?: number) => number = (
  shouldSkip?: number
) => {
  const pokedexNumber = Math.floor(Math.random() * MAX_DEX_ID) + 1;

  if (pokedexNumber !== shouldSkip) return pokedexNumber;

  return getRandomPokemon(shouldSkip);
};

export const getOptionsForVote = () => {
  const firstId = getRandomPokemon();
  const secondId = getRandomPokemon(firstId);

  return [firstId, secondId];
};
