import { Box, Toolbar, CssBaseline, IconButton, Typography, Container, Paper, AppBar } from '@mui/material';
import { Outlet } from 'react-router';

import LogoutIcon from '@mui/icons-material/Logout';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { ThemeProvider, type Theme } from '@aws-amplify/ui-react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

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
            backgroundColor: '#14dbab',
            borderWidth: '0',
          },
          link: {
            color: '#9266ff',
          },
        },
        fieldcontrol: {
          _focus: {
            boxShadow: `0 0 0 2px #9266ff`,
          },
        },
        tabs: {
          item: {
            color: '#9266ff',
            _active: {
              borderColor: '#9266ff',
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
      <AppBar position="fixed" sx={{ background: 'linear-gradient(to right, #14dbab, #9266ff)' }}>
        <Toolbar disableGutters sx={{ paddingRight: '4px', paddingLeft: '20px' }}>
          {isAuth() &&
            <Box sx={{ display: { xs: 'none', sm: 'block', md: 'block', } }}>
              <IconButton color="inherit" onClick={signOut} edge="start">
                <LogoutIcon />
              </IconButton>
            </Box>
          }

          <Box sx={{ height: "50px", width: "auto", flexGrow: 1 }} />
          {isAuth() && <Typography sx={{ paddingRight: '20px' }} variant="h6">{user?.signInDetails?.loginId}</Typography>}
          {/* <Box component="img" src={Logo} sx={{ marginLeft: '30px', height: "50px", width: "auto" }} /> */}
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 10 }}>
        <Outlet />
      </Container>

      {!isAuth() &&
        <Container sx={{ paddingTop: '200px' }} maxWidth='sm'>
          <ThemeProvider theme={sTheme}>

            <Paper elevation={2}>
              <Authenticator>
                <Typography variant='h4'>
                  R2D2, you know better than to trust a strange computer.
                </Typography>
              </Authenticator>
            </Paper>
          </ThemeProvider>
        </Container>
      }

    </Box>
  );
}