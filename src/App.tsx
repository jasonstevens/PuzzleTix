import '@aws-amplify/ui-react/styles.css';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import RootScreen from './component/screens/RootScreen';
import NoMatch from './component/NoMatch';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

const RegisterScreen = React.lazy(() => import('./component/screens/RegisterScreen'));
const ProcessScreen = React.lazy(() => import('./component/screens/ProcessScreen'));

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
            <Route path="test" element={<ProcessScreen />} />
            <Route path="register" element={<RegisterScreen />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Suspense>
      </ThemeProvider>
    </>
  );
};

export default App;