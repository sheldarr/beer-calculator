import { NextPage } from 'next';
import React, { useState } from 'react';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import calculatePlatoToOG from '../utils/calculatePlatoToOG';

const StyledPaper = styled(Paper)`
  margin-bottom: 2rem;
  margin-top: 2rem;
  min-height: calc(100vh - 4rem - 5rem);
  padding: 2rem;
`;

interface Malt {
  ebc: number;
  volume: number;
}

const Home: NextPage = () => {
  const [plato, setPlato] = useState(12);
  const [og, setOg] = useState(calculatePlatoToOG(plato));
  const [malts, setMalts] = useState<Malt[]>([]);

  const totalEbc = malts.reduce((ebc, malt) => {
    const srm = malt.ebc * 0.508;
    const lovibond = (srm + 0.76) / 1.3546;

    return ebc;
  }, 0);

  const addMalt = () => {
    setMalts([
      ...malts,
      {
        ebc: 0,
        volume: 0,
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
            <Grid container item spacing={1} xs={12}>
              <Grid item>
                <form noValidate autoComplete="off">
                  <TextField
                    label="°Plato"
                    onChange={(event) => {
                      setPlato(Number(event.target.value));
                    }}
                    type="number"
                    value={plato}
                  />
                </form>
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
            <Grid container item spacing={1} xs={12}>
              {malts.map((malt, index) => (
                <Grid container item key={index} spacing={1} xs={12}>
                  <Grid item>
                    <form noValidate autoComplete="off">
                      <TextField label="EBC" type="number" value={malt.ebc} />
                    </form>
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Volume"
                      type="number"
                      value={malt.volume}
                    />
                  </Grid>
                </Grid>
              ))}
              <Grid item>
                <Button color="primary" onClick={addMalt} variant="contained">
                  Add malt
                </Button>
              </Grid>
              <Grid item>
                <TextField
                  disabled
                  label="EBC"
                  type="number"
                  value={totalEbc}
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
