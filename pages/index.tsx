import { NextPage } from 'next';
import React, { useState } from 'react';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import { calculatePlatoToOg } from '../utils/unitConverters';
import Abv from '../components/Abv';
import Color from '../components/Color';
import Hops, { Hop } from '../components/Hops';
import Ibu from '../components/Ibu';
import Malts, { Malt } from '../components/Malts';
import Params from '../components/Params';

const StyledPaper = styled(Paper)`
  margin-bottom: 2rem;
  margin-top: 2rem;
  min-height: calc(100vh - 4rem - 5rem);
  padding: 2rem;
`;

const Home: NextPage = () => {
  const [batchVolume, setBatchVolume] = useState(24);
  const [boilTime, setBoilTime] = useState(70);
  const [density, setDensity] = useState(12);
  const [finalDensity, setFinalDensity] = useState(3);
  const [malts, setMalts] = useState<Malt[]>([
    {
      ebc: 3.6,
      weight: 5,
    },
  ]);
  const [hops, setHops] = useState<Hop[]>([
    {
      alphaAcids: 10,
      boilTime,
      weight: 30,
    },
  ]);

  const originalGravity = calculatePlatoToOg(density);

  return (
    <div>
      <Head>
        <title>beer-calculator</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Container>
        <StyledPaper>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Params
                batchVolume={batchVolume}
                boilTime={boilTime}
                density={density}
                finalDensity={finalDensity}
                onBatchVolumeChange={setBatchVolume}
                onBoilTimeChange={setBoilTime}
                onDensityChange={setDensity}
                onFinalDensityChange={setFinalDensity}
              />
            </Grid>
            <Grid item xs={12}>
              <Abv finalDensity={finalDensity} originalDensity={density} />
            </Grid>
            <Grid item xs={12}>
              <Malts malts={malts} onMaltsChange={setMalts} />
            </Grid>
            <Grid item xs={12}>
              <Color batchVolume={batchVolume} malts={malts} />
            </Grid>
            <Grid item xs={12}>
              <Hops boilTime={boilTime} hops={hops} onHopsChange={setHops} />
            </Grid>
            <Grid item xs={12}>
              <Ibu
                batchVolume={batchVolume}
                boilTime={boilTime}
                hops={hops}
                originalGravity={originalGravity}
              />
            </Grid>
          </Grid>
        </StyledPaper>
      </Container>
    </div>
  );
};

export default Home;
