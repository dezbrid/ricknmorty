import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RequestCharacter} from '@interfaces/character';
interface RequestCharacterByName {
  name: string;
  page: number;
}
export const characterApi = createApi({
  reducerPath: 'characterApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://rickandmortyapi.com/api/'}),
  endpoints: builder => ({
    getCharacterByName: builder.query<RequestCharacter, RequestCharacterByName>(
      {
        query: ({name, page}) =>
          name.length > 0
            ? `character/?page=${page}&name=${name}`
            : `/character?page=${page}`,
      },
    ),
  }),
});

export const {useGetCharacterByNameQuery} = characterApi;
