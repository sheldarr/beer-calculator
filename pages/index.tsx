import { NextPage } from 'next';
import React, { useState } from 'react';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import calculatePlatoToOG from '../utils/calculatePlatoToOG';

const StyledPaper = styled(Paper)`
  margin-bottom: 2rem;
  margin-top: 2rem;
  min-height: calc(100vh - 4rem - 5rem);
  padding: 2rem;
`;

const Home: NextPage = () => {
  const [plato, setPlato] = useState(12);
  const [og, setOg] = useState(calculatePlatoToOG(plato));

  return (
    <div>
      <Head>
        <title>beer-calculator</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Container>
        <StyledPaper>
          <Grid container>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <TextField
                disabled
                label="OG"
                type="number"
                value={og.toFixed(3)}
              />
            </Grid>
          </Grid>
        </StyledPaper>
      </Container>
    </div>
  );
};

export default Home;
