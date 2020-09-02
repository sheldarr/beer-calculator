import { NextPage } from 'next';
import React, { useState } from 'react';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';

import {
  ebcToSrm,
  kgToLbs,
  lToGal,
  mcuToSrmMorey,
  srmToEbc,
  srmToLovibond,
} from '../utils/unitConverters';

import getHexColorForSrm from '../utils/getHexColorForSrm';
import Params from './components/Params';
import Malts, { Malt } from './components/Malts';

const StyledPaper = styled(Paper)`
  margin-bottom: 2rem;
  margin-top: 2rem;
  min-height: calc(100vh - 4rem - 5rem);
  padding: 2rem;
`;

interface SrmAvatarProps {
  srmHexColor: string;
}

const SrmAvatar = styled(Avatar)<SrmAvatarProps>`
  background-color: ${(props) => props.srmHexColor} !important;
`;

const Home: NextPage = () => {
  const [density, setDensity] = useState(12);
  const [malts, setMalts] = useState<Malt[]>([
    {
      ebc: 3.6,
      weight: 5,
    },
  ]);

  const [batchVolume, setBatchVolume] = useState(20);

  const mcu = malts.reduce((mcu, malt) => {
    const srm = ebcToSrm(malt.ebc);
    const lovibond = srmToLovibond(srm);
    const weightInLbs = kgToLbs(malt.weight);
    const batchVolumeInGaloons = lToGal(batchVolume);

    return mcu + (lovibond * weightInLbs) / batchVolumeInGaloons;
  }, 0);

  const srmMorey = mcuToSrmMorey(mcu);
  const ebcMorey = srmToEbc(srmMorey);

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
            <Grid container item spacing={1}>
              <h2>Color</h2>
              <Grid container item spacing={1}>
                <Grid item>
                  <TextField
                    disabled
                    label="MCU"
                    type="number"
                    value={mcu.toFixed(2)}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    disabled
                    label="SRM Morey"
                    type="number"
                    value={srmMorey.toFixed(2)}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    disabled
                    label="EBC Morey"
                    type="number"
                    value={ebcMorey.toFixed(2)}
                  />
                </Grid>
                <Grid item>
                  <SrmAvatar srmHexColor={getHexColorForSrm(srmMorey)}>
                    {Math.round(srmMorey)}
                  </SrmAvatar>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </StyledPaper>
      </Container>
    </div>
  );
};

export default Home;
