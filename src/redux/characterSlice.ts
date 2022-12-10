import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '@redux/store';
import {Character, RequestCharacterOptions} from '@interfaces/character';
import {Nullable} from '@interfaces/generic';

export interface CharacterState {
  characterList: Character[];
  nextPage: Nullable<string>;
  loading: boolean;
}
const INITIAL_URL: string = 'https://rickandmortyapi.com/api/character';
interface ArgCharacter {
  name?: Nullable<string>;
  next?: boolean;
}
export const requestCharacterAsync = createAsyncThunk<
  RequestCharacterOptions,
  ArgCharacter,
  {state: RootState}
>(
  'character/requestCharacterAsync',
  async ({name = null, next = false}, {getState}) => {
    const {
      characters: {nextPage},
    } = getState();
    let currentUrl = '';
    if (next) {
      currentUrl = nextPage!;
    } else if (name) {
      currentUrl = `${INITIAL_URL}/?name=${name}`;
    } else {
      currentUrl = INITIAL_URL;
    }
    const response = await fetch(`${currentUrl}`, {method: 'GET'});
    const data = await response.json();
    return {...data, push: next} as RequestCharacterOptions;
  },
);
const initialState: CharacterState = {
  characterList: [],
  loading: false,
  nextPage: '',
};
export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(requestCharacterAsync.pending, state => {
        state.loading = true;
      })
      .addCase(requestCharacterAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.nextPage = action.payload.info.next;
        state.characterList = action.payload.push
          ? [...state.characterList, ...action.payload.results]
          : action.payload.results;
      })
      .addCase(requestCharacterAsync.rejected, state => {
        state.loading = false;
      });
  },
});

export const characterList = (state: RootState) =>
  state.characters.characterList;
export const listLoading = (state: RootState) => state.characters.loading;

export default characterSlice.reducer;
