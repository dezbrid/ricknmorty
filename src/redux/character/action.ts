import {createTypes, completeTypes} from 'redux-recompose';

/*const CharacterService={
    getCharacters:()=>
}*/
const completedActions = completeTypes({
  primaryActions: ['GET_CHARACTERS'],
});
export const actions = createTypes(completedActions, '@@CHARACTER');
export const target = {
  CHARACTERS: 'characters',
};

const actionCreators = {
  getBooks: () => ({
    type: actions.GET_CHARACTERS,
    target: target.CHARACTERS,
    // service: CharacterService.getCharacters,
  }),
};

export default actionCreators;
