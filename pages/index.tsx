import { NextPage } from 'next';
import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { calculatePlatoToOg } from '../utils/unitConverters';
import Abv from '../components/Abv';
import Color from '../components/Color';
import Hops, { Hop } from '../components/Hops';
import Ibu from '../components/Ibu';
import Malts, { Malt } from '../components/Malts';
import Mash from '../components/Mash';
import Params from '../components/Params';

const Home: NextPage = () => {
  const [batchVolume, setBatchVolume] = useState(23);
  const [boilTime, setBoilTime] = useState(70);
  const [density, setDensity] = useState(12);
  const [finalDensity, setFinalDensity] = useState(3);
  const [malts, setMalts] = useState<Malt[]>([
    {
      ebc: 6.25,
      extract: 81.6,
      name: 'Pale Ale',
      weight: 5,
    },
  ]);
  const [hops, setHops] = useState<Hop[]>([
    {
      alphaAcids: 6.7,
      boilTime,
      name: 'Marynka',
      weight: 30,
    },
  ]);

  const originalGravity = calculatePlatoToOg(density);

  return (
    <Container>
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
          <Mash
            batchVolume={batchVolume}
            malts={malts}
            onEstimatedDensityChange={setDensity}
          />
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
    </Container>
  );
};

export default Home;
