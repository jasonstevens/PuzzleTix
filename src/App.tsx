import '@aws-amplify/ui-react/styles.css';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import RootScreen from './component/screens/RootScreen';
import NoMatch from './component/NoMatch';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import PuzzlerScreen from './component/screens/PuzzlerScreen';
import TeamOpsScreen from './component/screens/TeamOpsScreen';

const Auth = React.lazy(() => import('./component/core/Auth'));
const Nav = React.lazy(() => import('./component/core/Nav'));
const RegisterScreen = React.lazy(() => import('./component/screens/RegisterScreen'));
const WaitScreen = React.lazy(() => import('./component/screens/WaitScreen'));

const WaiterScreen = React.lazy(() => import('./component/screens/WaiterScreen'));
const VolunteerScreen = React.lazy(() => import('./component/screens/VolunteerScreen'));
const SpectatorScreen = React.lazy(() => import('./component/screens/SpectatorScreen'));
const FoundlingScreen = React.lazy(() => import('./component/screens/FoundlingScreen'));

const VolunteerListScreen = React.lazy(() => import('./component/screens/VolunteerListScreen'));
const SpectatorListScreen = React.lazy(() => import('./component/screens/SpectatorListScreen'));
const FoundlingListScreen = React.lazy(() => import('./component/screens/FoundlingListScreen'));
const WaiterListScreen = React.lazy(() => import('./component/screens/WaiterListScreen'));
const FoundlingEventListScreen = React.lazy(() => import('./component/screens/FoundlingEventListScreen'));
const FoundlingResponseListScreen = React.lazy(() => import('./component/screens/FoundlingResponseListScreen'));
const PuzzlerListScreen = React.lazy(() => import('./component/screens/PuzzlerListScreen'));

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
            <Route path="waitlist/:eventId" element={<WaiterScreen />} />

            <Route path="console/volunteer/:eventId" element={<VolunteerListScreen />} />
            <Route path="console/spectator/:eventId" element={<SpectatorListScreen />} />
            <Route path="console/waiter/:eventId" element={<WaiterListScreen />} />

            <Route path="console/foundling" element={<FoundlingListScreen />} />
            <Route path="console/foundlingevent" element={<FoundlingEventListScreen />} />
            <Route path="console/foundlingresponse" element={<FoundlingResponseListScreen />} />
            <Route path="console/puzzler" element={<PuzzlerListScreen />} />
            <Route path="console/wait" element={<WaitScreen />} />

            <Route path="/finder" element={<Auth />}>
              <Route element={<Nav />}>
                <Route path="" element={<FoundlingScreen />} />
              </Route>
            </Route>

            <Route path="/puzzler" element={<Auth />}>
              <Route element={<Nav />}>
                <Route path="" element={<PuzzlerScreen />} />
                <Route path="ops/team" element={<TeamOpsScreen />} />
              </Route>
            </Route>

            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Suspense>
      </ThemeProvider>
    </>
  );
};

export default App;