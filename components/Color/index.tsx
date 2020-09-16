import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';

import {
  ebcToSrm,
  kgToLbs,
  lToGal,
  mcuToSrmMorey,
  srmToEbc,
  srmToLovibond,
} from '../../utils/unitConverters';
import getHexColorForSrm from '../../utils/getHexColorForSrm';
import { Malt } from '../Malts';

interface SrmAvatarProps {
  srmHexColor: string;
}

const SrmAvatar = styled(Avatar)<SrmAvatarProps>`
  background-color: ${(props) => props.srmHexColor} !important;
`;

interface Props {
  batchVolume: number;
  malts: Malt[];
}

const Color: React.FunctionComponent<Props> = ({ batchVolume, malts }) => {
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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h2>Color</h2>
      </Grid>
      <Grid item xs={2}>
        <TextField
          disabled
          label="SRM Morey"
          type="number"
          value={srmMorey.toFixed(2)}
        />
      </Grid>
      <Grid item xs={2}>
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
  );
};

export default Color;
