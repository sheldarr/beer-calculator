import { NextPage } from 'next';
import React, { useRef, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import SaveIcon from '@material-ui/icons/Save';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SettingsIcon from '@material-ui/icons/Settings';
import fileDownload from 'js-file-download';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import useLocalStorageState from 'use-local-storage-state';
import { calculatePlatoToOg } from '../utils/unitConverters';
import Abv from '../components/Abv';
import Color from '../components/Color';
import Hops, { Hop } from '../components/Hops';
import Ibu from '../components/Ibu';
import Malts, { Malt } from '../components/Malts';
import Mash from '../components/Mash';
import Params from '../components/Params';

const Settings = styled(SpeedDial)`
  position: fixed !important;
  bottom: 2rem;
  right: 2rem;
`;

const Home: NextPage = () => {
  const [batchVolume, setBatchVolume] = useLocalStorageState('batchVolume', 23);
  const [boilTime, setBoilTime] = useLocalStorageState('boilTime', 70);
  const [density, setDensity] = useLocalStorageState('density', 12);
  const [finalDensity, setFinalDensity] = useLocalStorageState(
    'finalDensity',
    3,
  );
  const [malts, setMalts] = useLocalStorageState<Malt[]>('malts', [
    {
      ebc: 6.25,
      extract: 81.6,
      name: 'Pale Ale',
      weight: 5,
    },
  ]);
  const [hops, setHops] = useLocalStorageState<Hop[]>('hops', [
    {
      alphaAcids: 6.7,
      boilTime,
      name: 'Marynka',
      weight: 30,
    },
  ]);
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);
  const fileInput = useRef<HTMLInputElement>();

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
      <input
        onChange={(event) => {
          const file = event.target.files[0];
          const reader = new FileReader();

          reader.onload = function (event) {
            const {
              batchVolume,
              boilTime,
              density,
              finalDensity,
              hops,
              malts,
            } = JSON.parse(event.target.result as string);

            setBatchVolume(batchVolume);
            setBoilTime(boilTime);
            setDensity(density);
            setFinalDensity(finalDensity);
            setHops(hops);
            setMalts(malts);

            fileInput.current.value = '';
          };

          reader.readAsText(file);
        }}
        ref={fileInput}
        style={{ display: 'none' }}
        type="file"
      />
      <Settings
        ariaLabel="Settings"
        icon={<SpeedDialIcon openIcon={<SettingsIcon />} />}
        onClose={() => {
          setIsSpeedDialOpen(false);
        }}
        onOpen={() => {
          setIsSpeedDialOpen(true);
        }}
        open={isSpeedDialOpen}
      >
        {[
          {
            icon: <RotateLeftIcon />,
            name: 'Reset',
            onClick: () => {
              setBatchVolume.reset();
              setBoilTime.reset();
              setDensity.reset();
              setFinalDensity.reset();
              setHops.reset();
              setMalts.reset();
            },
          },
          {
            icon: <CloudUploadIcon />,
            name: 'Load',
            onClick: () => {
              fileInput?.current.click();
            },
          },
          {
            icon: <SaveIcon />,
            name: 'Save',
            onClick: () => {
              fileDownload(
                JSON.stringify({
                  batchVolume,
                  boilTime,
                  density,
                  finalDensity,
                  hops,
                  malts,
                }),
                'beer-calculator.json',
              );
            },
          },
        ].map((action) => (
          <SpeedDialAction
            icon={action.icon}
            key={action.name}
            onClick={action.onClick}
            tooltipTitle={action.name}
          />
        ))}
      </Settings>
    </Container>
  );
};

export default Home;
