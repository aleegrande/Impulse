import React from 'react';
import {YellowBox} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';

import {FirebaseProvider} from './src/contexts/firebase-context';

YellowBox.ignoreWarnings(['Setting a timer for a long period of time']);
export default function App() {
  return (
    <PaperProvider>
      <FirebaseProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </FirebaseProvider>
    </PaperProvider>
  );
}
