import '@aws-amplify/ui-react/styles.css';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import RootScreen from './component/screens/RootScreen';
import NoMatch from './component/NoMatch';
import React from 'react';

const RegisterScreen = React.lazy(() => import('./component/screens/RegisterScreen'));
const ProcessScreen = React.lazy(() => import('./component/screens/ProcessScreen'));

const App = () => {
  return (
    <>
      <Suspense>
        <Routes>
          <Route path="/" element={<RootScreen />} />
          <Route path="test" element={<ProcessScreen />} />
          <Route path="register" element={<RegisterScreen />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;