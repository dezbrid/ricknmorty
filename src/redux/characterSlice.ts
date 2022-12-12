import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '@redux/store';
import {Character, RequestCharacterOptions} from '@interfaces/character';
import {Nullable} from '@interfaces/generic';

export interface CharacterState {
  characterList: Character[];
  nextPage: Nullable<string>;
  loading: boolean;
  errorMsg: string;
}

interface ArgCharacter {
  name?: Nullable<string>;
  next?: boolean;
}
export const requestCharacterAsync = createAsyncThunk<
  RequestCharacterOptions,
  ArgCharacter,
  {state: RootState; rejectValue: string; extra: {url: string}}
>(
  'character/requestCharacterAsync',
  async ({name = null, next = false}, {getState, rejectWithValue, extra}) => {
    const {
      characters: {nextPage},
    } = getState();
    let currentUrl = '';
    if (next) {
      currentUrl = nextPage!;
    } else if (name) {
      currentUrl = `${extra.url}/?name=${name}`;
    } else {
      currentUrl = extra.url;
    }
    const response = await fetch(`${currentUrl}`, {method: 'GET'});
    const data = await response.json();
    if (response.ok) {
      return {...data, push: next} as RequestCharacterOptions;
    } else {
      return rejectWithValue(data.error);
    }
  },
  {
    condition: (argCharacter, {getState}) => {
      const {
        characters: {nextPage},
      } = getState();
      if (argCharacter.next && nextPage == null) {
        return false;
      }
    },
  },
);
const initialState: CharacterState = {
  characterList: [],
  loading: false,
  nextPage: '',
  errorMsg: '',
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
      .addCase(requestCharacterAsync.rejected, (state, action) => {
        state.loading = false;
        state.characterList = [];
        state.errorMsg = action.payload!;
      });
  },
});

export const characterList = (state: RootState) =>
  state.characters.characterList;
export const listLoading = (state: RootState) => state.characters.loading;
export const errorMessage = (state: RootState) => state.characters.errorMsg;
export default characterSlice.reducer;
