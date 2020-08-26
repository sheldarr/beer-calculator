import { NextPage } from 'next';
import React, { useState } from 'react';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

import calculatePlatoToOg from '../utils/calculatePlatoToOg';

const StyledPaper = styled(Paper)`
  margin-bottom: 2rem;
  margin-top: 2rem;
  min-height: calc(100vh - 4rem - 5rem);
  padding: 2rem;
`;

interface Malt {
  ebc: number;
  weight: number;
}

const Home: NextPage = () => {
  const [plato, setPlato] = useState(12);
  const [og, setOg] = useState(calculatePlatoToOg(plato));
  const [malts, setMalts] = useState<Malt[]>([
    {
      ebc: 3.6,
      weight: 5,
    },
  ]);

  const [batchVolume] = useState(20);

  const mcu = malts.reduce((mcu, malt) => {
    const srm = malt.ebc * 0.508;
    const lovibond = (srm + 0.76) / 1.3546;

    console.log('SRM', srm);
    console.log('°Lovibond', lovibond);

    const weightInLbs = malt.weight * 2.20462;
    console.log('lbs', weightInLbs);
    const batchVolumeInGaloons = batchVolume * 0.264172;
    console.log('gal', batchVolumeInGaloons);

    return mcu + (lovibond * weightInLbs) / batchVolumeInGaloons;
  }, 0);

  const srmMorey = 1.4922 * Math.pow(mcu, 0.6859);
  const ebcMorey = srmMorey * 1.97;

  const addMalt = () => {
    setMalts([
      ...malts,
      {
        ebc: 0,
        weight: 0,
      },
    ]);
  };

  return (
    <div>
      <Head>
        <title>beer-calculator</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Container>
        <StyledPaper>
          <Grid container spacing={4}>
            <Grid container item spacing={1}>
              <Grid item>
                <TextField
                  label="°Plato"
                  onChange={(event) => {
                    setPlato(Number(event.target.value));
                  }}
                  type="number"
                  value={plato}
                />
              </Grid>
              <Grid item>
                <TextField
                  disabled
                  label="OG"
                  type="number"
                  value={og.toFixed(3)}
                />
              </Grid>
            </Grid>
            <Grid container item spacing={2}>
              {malts.map((malt, index) => (
                <Grid container item key={index} spacing={1}>
                  <Grid item>
                    <TextField label="EBC" type="number" value={malt.ebc} />
                  </Grid>
                  <Grid item>
                    <TextField
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">kg</InputAdornment>
                        ),
                      }}
                      label="Weight"
                      type="number"
                      value={malt.weight}
                    />
                  </Grid>
                </Grid>
              ))}
              <Grid item>
                <Button color="primary" onClick={addMalt} variant="contained">
                  Add malt
                </Button>
              </Grid>
            </Grid>
            <Grid container item spacing={1}>
              <Grid item>
                <TextField disabled label="MCU" type="number" value={mcu} />
              </Grid>
              <Grid item>
                <TextField
                  disabled
                  label="SRM Morey"
                  type="number"
                  value={srmMorey}
                />
              </Grid>
              <Grid item>
                <TextField
                  disabled
                  label="EBC Morey"
                  type="number"
                  value={ebcMorey}
                />
              </Grid>
            </Grid>
          </Grid>
        </StyledPaper>
      </Container>
    </div>
  );
};

export default Home;
