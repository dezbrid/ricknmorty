import {Nullable} from './generic';

export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
export interface Info {
  count: number;
  pages: number;
  next: Nullable<string>;
  prev: Nullable<string>;
}

export interface RequestCharacter {
  info: Info;
  results: Character[];
}
export interface RequestCharacterOptions extends RequestCharacter {
  push?: boolean;
}
