import '@aws-amplify/ui-react/styles.css';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import RootScreen from './component/screens/RootScreen';
import NoMatch from './component/NoMatch';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

const Auth = React.lazy(() => import('./component/core/Auth'));
const Nav = React.lazy(() => import('./component/core/Nav'));
const RegisterScreen = React.lazy(() => import('./component/screens/RegisterScreen'));
const WaitScreen = React.lazy(() => import('./component/screens/WaitScreen'));
const VolunteerScreen = React.lazy(() => import('./component/screens/VolunteerScreen'));
const SpectatorScreen = React.lazy(() => import('./component/screens/SpectatorScreen'));
const FinderScreen = React.lazy(() => import('./component/screens/FinderScreen'));

const VolunteerListScreen = React.lazy(() => import('./component/screens/VolunteerListScreen'));
const SpectatorListScreen = React.lazy(() => import('./component/screens/SpectatorListScreen'));
const FoundlingListScreen = React.lazy(() => import('./component/screens/FoundlingListScreen'));
const FoundlingEventListScreen = React.lazy(() => import('./component/screens/FoundlingEventListScreen'));
const FoundlingResponseListScreen = React.lazy(() => import('./component/screens/FoundlingResponseListScreen'));

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
            <Route path="volunteer/:eventId" element={<VolunteerScreen />} />
            <Route path="spectator/:eventId" element={<SpectatorScreen />} />

            <Route path="consoleadmin/volunteer/:eventId" element={<VolunteerListScreen />} />
            <Route path="consoleadmin/spectator/:eventId" element={<SpectatorListScreen />} />

            <Route path="consoleadmin/foundling" element={<FoundlingListScreen />} />
            <Route path="consoleadmin/foundlingevent" element={<FoundlingEventListScreen />} />
            <Route path="consoleadmin/foundlingresponse" element={<FoundlingResponseListScreen />} />

            <Route path="/finder" element={<Auth />}>
              <Route element={<Nav />}>
                <Route path="" element={<FinderScreen />} />
              </Route>
            </Route>

            <Route path="wait" element={<WaitScreen />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Suspense>
      </ThemeProvider>
    </>
  );
};

export default App;