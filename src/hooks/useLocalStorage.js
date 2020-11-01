import { useState, useEffect } from 'react';

/**Custom hook used to keep state data in local storage
 *  Saves token to state. When token/state changes, local storage is updated
 * 
 * State:
 *    - item: first looks for this value in local storage. 
 *            If it cannot be found, uses 'firstValue' (defaults to null)
 * 
 * When item changes, effect reruns. 
 *  - if item is null, key/item pair is removed from local storage
 *  - otherwise, item value is updated in local storage
 * 
 * For components, this custom hook is no different from saving something in state. (Indeed, we 
 * are still saving a value in state. We are also just saving that value to local storage too 
 * with an effect)
 * 
 * Per the React docs, custom hooks are 'a mechanism to reuse stateful logic'. Therefore, each call
 * to a custom hook is fully isolated (just like each call to useState is completely isolated).
 * State saved in different componenets exists independently of one another 
 */
function useLocalStorage(key, firstValue = null) {
  const initialValue = localStorage.getItem(key) || firstValue;

  const [item, setItem] = useState(initialValue);
  console.log('in local storage. key:', key);

  useEffect(function setKeyInLocalStorage() {
    // console.log('in useLocalStorage effect hook');
    // console.log('in useLocalStorage effect hook. Key:', key);
    // console.log('in useLocalStorage effect hook. Item:', item);

    // TODO: How does useLocalStorage remember the key value after the hook initially runs?
    if (item === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, item);
    }
  }, [key, item]);

  // console.log('after useLocalStorage effect. Key:', key);
  // console.log('after useLocalStorage effect. Item:', item);

  // return state and the setter function. App.js will then set state with this hook
  return [item, setItem];
}


export default useLocalStorage;