import { Outlet } from 'react-router';

import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json';

Amplify.configure(outputs);

import '@aws-amplify/ui-react/styles.css';

export default function Auth() {

  return (
    <Authenticator.Provider>
      <Outlet />
    </Authenticator.Provider>

  );
}