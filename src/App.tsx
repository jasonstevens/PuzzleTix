
import '@aws-amplify/ui-react/styles.css';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import RootScreen from './component/screen/RootScreen';
import ProcessScreen from './component/screen/ProcessScreen';
import NoMatch from './component/NoMatch';


const App = () => {
  return (
    <>

      <Suspense>
        <Routes>
          <Route path="/" element={<RootScreen />} />
          <Route path="test" element={<ProcessScreen />} />

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;