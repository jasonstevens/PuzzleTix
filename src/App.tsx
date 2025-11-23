import '@aws-amplify/ui-react/styles.css';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import RootScreen from './component/screens/RootScreen';
import NoMatch from './component/NoMatch';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import SpectatorListScreen from './component/screens/SpectatorListScreen';

const RegisterScreen = React.lazy(() => import('./component/screens/RegisterScreen'));
const WaitScreen = React.lazy(() => import('./component/screens/WaitScreen'));
const VolunteerScreen = React.lazy(() => import('./component/screens/VolunteerScreen'));
const SpectatorScreen = React.lazy(() => import('./component/screens/SpectatorScreen'));
const VolunteerListScreen = React.lazy(() => import('./component/screens/VolunteerListScreen'));

const theme = createTheme({
  palette: {
    primary: {
      main: '#e33e7f'
    },
    secondary: {
      main: '#bf3ee3ff'
    }
  }
});

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Suspense>
          <Routes>
            <Route path="/" element={<RootScreen />} />
            <Route path="register" element={<RegisterScreen />} />
            <Route path="volunteer/:event" element={<VolunteerScreen />} />
            <Route path="spectator/:event" element={<SpectatorScreen />} />

            <Route path="consoleadmin/volunteer/:event" element={<VolunteerListScreen />} />
            <Route path="consoleadmin/spectator/:event" element={<SpectatorListScreen />} />
            <Route path="wait" element={<WaitScreen />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Suspense>
      </ThemeProvider>
    </>
  );
};

export default App;