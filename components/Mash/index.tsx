import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import { Malt } from '../Malts';

interface Props {
  batchVolume: number;
  malts: Malt[];
}

const Mash: React.FunctionComponent<Props> = ({ batchVolume, malts }) => {
  const [efficiency, setEfficiency] = useState(70);

  const [theoreticalExtract, realExtract] = malts.reduce(
    ([theoreticalExtract, realExtract], malt) => {
      return [
        theoreticalExtract + malt.extract * malt.weight * 10,
        realExtract + (malt.extract * malt.weight * efficiency) / 10,
      ];
    },
    [0, 0],
  );

  const millilitersOfExtract = realExtract / 1.587;
  const waterInWort = batchVolume * 1000 - millilitersOfExtract;
  const wortWeight = waterInWort + realExtract;
  const estimatedDensity = (realExtract / wortWeight) * 100;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h2>Mash</h2>
      </Grid>
      <Grid item xs={2}>
        <TextField
          fullWidth
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          inputProps={{
            max: 100,
            min: 1,
            step: 0.1,
          }}
          label="Efficiency"
          onChange={(event) => {
            setEfficiency(Number(event.target.value));
          }}
          type="number"
          value={efficiency}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          disabled
          InputProps={{
            endAdornment: <InputAdornment position="end">g</InputAdornment>,
          }}
          label="Theoretical extract"
          type="number"
          value={theoreticalExtract.toFixed(2)}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          disabled
          InputProps={{
            endAdornment: <InputAdornment position="end">g</InputAdornment>,
          }}
          label="Real extract"
          type="number"
          value={realExtract.toFixed(2)}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          disabled
          InputProps={{
            endAdornment: <InputAdornment position="end">°P</InputAdornment>,
          }}
          label="Estimated density"
          type="number"
          value={estimatedDensity.toFixed(2)}
        />
      </Grid>
    </Grid>
  );
};

export default Mash;
