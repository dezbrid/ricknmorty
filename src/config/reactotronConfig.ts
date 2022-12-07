import Reactotron, {overlay, trackGlobalErrors} from 'reactotron-react-native';
import {Tron} from '@interfaces/reactotron';

declare global {
  interface Console {
    tron: Tron;
  }
}

// If  android not coonect
// execute first `adb reverse tcp:9090 tcp:9090`
// second `adb reverse --list`
if (__DEV__) {
  Reactotron.configure({name: 'rick y morty'})
    .use(trackGlobalErrors({}))
    .useReactNative()
    .use(overlay())
    .connect();

  console.tron = {
    log: Reactotron.logImportant,
    clear: Reactotron.clear,
    customCommand: Reactotron.onCustomCommand,
    display: Reactotron.display,
  };
}

export default Reactotron;
