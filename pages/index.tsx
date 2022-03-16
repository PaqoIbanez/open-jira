import { Card, CardHeader, Grid, Typography } from '@mui/material';
import type { NextPage } from 'next';
import { Layout } from '../components/layouts';
import { EntryList, NewEntry } from '../components/ui';



const HomePage: NextPage = () => {
  return (
    <Layout title='Home - OpenJira'>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <Typography sx={{ fontSize: '20px', fontWeight: 300, margin: '10px 10px' }} >
              Pendientes
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
  )
}

export default HomePage;
