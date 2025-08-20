
import { Authenticator } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css';

import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';
import PuzzleEventList from '../PuzzleEventList';

export default function App() {
  return (
    <>
      <PuzzleEventList />

      <br />
      <PaymentForm
        applicationId="sandbox-sq0idb-8HmJ8A4B5YSiqalsBJxbVw"
        cardTokenizeResponseReceived={(token, verifiedBuyer) => {
          console.log('token:', token);
          console.log('verifiedBuyer:', verifiedBuyer);
        }}
        locationId='LH6VET0JMRVNY'
      >

        {/* <GooglePay /> */}

        <CreditCard />

      </PaymentForm>
      <br />
      <Authenticator>
        {({ signOut, user }) => (
          <main>
            <h1>Hello {user?.username}</h1>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
    </>
  );
};