import React from 'react';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

import { calculatePlatoToOg } from '../../../utils/unitConverters';

interface Props {
  batchVolume: number;
  density: number;
  onBatchVolumeChange: (batchVolume: number) => void;
  onDensityChange: (density: number) => void;
}

const Params: React.FunctionComponent<Props> = ({
  batchVolume,
  density,
  onBatchVolumeChange,
  onDensityChange,
}) => {
  calculatePlatoToOg(density);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h2>Parameters</h2>
      </Grid>
      <Grid item>
        <TextField
          InputProps={{
            endAdornment: <InputAdornment position="end">l</InputAdornment>,
          }}
          inputProps={{
            min: 0,
          }}
          label="Batch volume"
          onChange={(event) => {
            onBatchVolumeChange(Number(event.target.value));
          }}
          type="number"
          value={batchVolume.toFixed(2)}
        />
      </Grid>
      <Grid item>
        <TextField
          InputProps={{
            endAdornment: <InputAdornment position="end">°P</InputAdornment>,
          }}
          inputProps={{
            min: 0,
            step: 0.5,
          }}
          label="Density"
          onChange={(event) => {
            onDensityChange(Number(event.target.value));
          }}
          type="number"
          value={density}
        />
      </Grid>
      <Grid item>
        <TextField
          disabled
          InputProps={{
            endAdornment: <InputAdornment position="end">OG</InputAdornment>,
          }}
          label="Density"
          type="number"
          value={calculatePlatoToOg(density).toFixed(3)}
        />
      </Grid>
    </Grid>
  );
};

export default Params;
