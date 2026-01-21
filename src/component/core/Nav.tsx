import { Box, Toolbar, CssBaseline, IconButton, Typography, Container, AppBar, Paper } from '@mui/material';
import { Outlet } from 'react-router';

import LogoutIcon from '@mui/icons-material/Logout';

import { ThemeProvider, type Theme } from '@aws-amplify/ui-react';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import logo from '../../assets/puzzletix-white.svg'

export default function Nav() {

  const sTheme: Theme = {
    name: 'Auth Theme',
    tokens: {
      components: {
        authenticator: {
          router: {
            boxShadow: `0px`,
            borderWidth: '0',
          }
        },
        button: {
          primary: {
            backgroundColor: 'rgba(255, 102, 196, 1)',
            borderWidth: '0',
          },
          link: {
            color: 'rgba(255, 102, 196, 1)',
          },
        },
        fieldcontrol: {
          _focus: {
            boxShadow: `0 0 0 3px rgba(255, 102, 196, 1)`,
          },
        },
        tabs: {
          item: {
            color: 'rgba(255, 102, 196, 1)',
            _active: {
              borderColor: 'rgba(0, 0, 0, 1)',
              color: 'black',
            },
          },
        },
      },
    },
  };

  const { user, signOut } = useAuthenticator((context) => [context.user]);

  const isAuth = () => {
    return user?.signInDetails?.loginId;
  }

  return (
    <Box sx={{
      display: 'flex',
      backgroundImage: `url(${Image})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: 'top 55px left',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      overscrollBehavior: 'none'
    }}>

      <CssBaseline />
      <AppBar position="fixed" sx={{ background: 'linear-gradient(110deg, rgba(255, 222, 89, 1), rgba(255, 102, 196, 1))' }}>
        {isAuth() &&
          <>
            <Toolbar disableGutters>
              <Box sx={{ height: "50px", width: "auto", flexGrow: 1 }} />
              <Typography sx={{ paddingRight: '10px' }} variant="h6">{user?.signInDetails?.loginId}</Typography>
              <IconButton color="inherit" onClick={signOut} edge="start">
                <LogoutIcon />
              </IconButton>
            </Toolbar>
          </>
        }
      </AppBar>



      {isAuth() ?
        <Container sx={{ marginTop: '70px' }}>
          <Outlet />
        </Container>
        :
        <Container sx={{ marginTop: 10 }}>
          <Box component="img" src={logo} sx={{ maxWidth: "300px" }} />
          <ThemeProvider theme={sTheme}>
            <Paper elevation={10} sx={{ margin: '10px' }}>
              <Authenticator>
              </Authenticator>
            </Paper>
          </ThemeProvider>
        </Container>
      }

    </Box>
  );
}