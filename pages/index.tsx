import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import {
  calculatePlatoToOg,
  ebcToSrm,
  kgToLbs,
  lToGal,
  mcuToSrmMorey,
  srmToEbc,
  srmToLovibond,
} from '../utils/unitConverters';

import getHexColorForSrm from '../utils/getHexColorForSrm';

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

  useEffect(() => {
    setOg(calculatePlatoToOg(plato));
  }, [plato]);

  const mcu = malts.reduce((mcu, malt) => {
    const srm = ebcToSrm(malt.ebc);
    const lovibond = srmToLovibond(srm);
    const weightInLbs = kgToLbs(malt.weight);
    const batchVolumeInGaloons = lToGal(batchVolume);

    return mcu + (lovibond * weightInLbs) / batchVolumeInGaloons;
  }, 0);

  const srmMorey = mcuToSrmMorey(mcu);
  const ebcMorey = srmToEbc(srmMorey);

  const addMalt = () => {
    setMalts([
      ...malts,
      {
        ebc: 0,
        weight: 0,
      },
    ]);
  };

  const updateMalt = (index: number, newMalt: Malt) => {
    const newMalts = malts.map((malt, maltIndex) => {
      if (maltIndex === index) {
        return {
          ...malt,
          ...newMalt,
        };
      }

      return malt;
    });

    setMalts(newMalts);
  };

  const removeMalt = (index: number) => {
    const newMalts = malts.filter((malt, maltIndex) => {
      return maltIndex !== index;
    });

    setMalts(newMalts);
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
              <h2>Parameters</h2>
              <Grid container item spacing={1}>
                <Grid item>
                  <TextField
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">l</InputAdornment>
                      ),
                    }}
                    label="Batch volume"
                    type="number"
                    value={batchVolume.toFixed(3)}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">°P</InputAdornment>
                      ),
                    }}
                    label="Density"
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
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">OG</InputAdornment>
                      ),
                    }}
                    label="Density"
                    type="number"
                    value={og.toFixed(3)}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container item spacing={2}>
              <Grid item>
                <h2>Malts</h2>
              </Grid>
              <Grid item>
                <Button color="primary" onClick={addMalt} variant="contained">
                  Add malt
                </Button>
              </Grid>
              {malts.map((malt, index) => (
                <Grid container item key={index} spacing={1}>
                  <Grid item>
                    <TextField
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">EBC</InputAdornment>
                        ),
                      }}
                      label="Color"
                      onChange={(event) => {
                        updateMalt(index, {
                          ...malt,
                          ebc: Number(event.target.value),
                        });
                      }}
                      type="number"
                      value={malt.ebc}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">kg</InputAdornment>
                        ),
                      }}
                      label="Weight"
                      onChange={(event) => {
                        updateMalt(index, {
                          ...malt,
                          weight: Number(event.target.value),
                        });
                      }}
                      type="number"
                      value={malt.weight}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      disabled
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">lbs</InputAdornment>
                        ),
                      }}
                      label="Weight"
                      type="number"
                      value={kgToLbs(malt.weight).toFixed(2)}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      disabled
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">°L</InputAdornment>
                        ),
                      }}
                      label="Color"
                      type="number"
                      value={srmToLovibond(ebcToSrm(malt.ebc)).toFixed(1)}
                    />
                  </Grid>
                  <Grid item>
                    <IconButton
                      color="secondary"
                      onClick={() => {
                        removeMalt(index);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Grid item></Grid>
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
