import {createContext, useState} from 'react';

import Firebase from '../utils/firebase';

const FirebaseContext = createContext(null);

const FirebaseProvider = ({children}) => {
  const [firebase] = useState(new Firebase());

  return (
    <FirebaseContext.Provider value={{firebase}}>
      {children}
    </FirebaseContext.Provider>
  );
};

export {FirebaseContext, FirebaseProvider};
