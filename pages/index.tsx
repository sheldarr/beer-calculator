import { NextPage } from 'next';
import React, { useState } from 'react';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import Color from './components/Color';
import Malts, { Malt } from './components/Malts';
import Params from './components/Params';

const StyledPaper = styled(Paper)`
  margin-bottom: 2rem;
  margin-top: 2rem;
  min-height: calc(100vh - 4rem - 5rem);
  padding: 2rem;
`;

const Home: NextPage = () => {
  const [batchVolume, setBatchVolume] = useState(20);
  const [density, setDensity] = useState(12);
  const [malts, setMalts] = useState<Malt[]>([
    {
      ebc: 3.6,
      weight: 5,
    },
  ]);

  return (
    <div>
      <Head>
        <title>beer-calculator</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Container>
        <StyledPaper>
          <Grid container spacing={4}>
            <Grid item>
              <Params
                batchVolume={batchVolume}
                density={density}
                onBatchVolumeChange={setBatchVolume}
                onDensityChange={setDensity}
              />
            </Grid>
            <Grid item>
              <Malts malts={malts} onMaltsChange={setMalts} />
            </Grid>
            <Grid item>
              <Color batchVolume={batchVolume} malts={malts} />
            </Grid>
          </Grid>
        </StyledPaper>
      </Container>
    </div>
  );
};

export default Home;
