import type { NextPage } from 'next';
import { useContext, useEffect } from 'react';

import Cookies from 'js-cookie';
import { Card, Grid, Typography, ThemeProvider, CssBaseline } from '@mui/material';

import { UIContext } from '../context/ui';
import { Layout } from '../components/layouts';
import { darkTheme, lightTheme } from '../themes';
import { EntryList, NewEntry } from '../components/ui';


const HomePage: NextPage = () => {

  const { theme, toggleTheme } = useContext(UIContext);

  useEffect(() => {
    const currentTheme = Cookies.get('theme') === 'dark' ? 'light' : 'dark';
    toggleTheme(currentTheme);
  }, [])


  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <Layout title='Home - OpenJira'>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 100px)' }}>
              <Typography sx={{ fontSize: '20px', fontWeight: 300, margin: '10px 10px' }} >
                Pendientess
              </Typography>
              <NewEntry />
              <EntryList status='pending' />
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 100px)' }}>
              <Typography sx={{ fontSize: '20px', fontWeight: 300, margin: '10px 10px' }} >
                En progreso
              </Typography>
              <EntryList status='in-progress' />
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 100px)' }}>
              <Typography sx={{ fontSize: '20px', fontWeight: 300, margin: '10px 10px' }} >
                Completadas
              </Typography>
              <EntryList status='finished' />
            </Card>
          </Grid>
        </Grid>

      </Layout>
    </ThemeProvider>
  )
}

export default HomePage;
