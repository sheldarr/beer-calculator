import React from 'react';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

import { calculatePlatoToOg } from '../../utils/unitConverters';

interface Props {
  batchVolume: number;
  boilTime: number;
  density: number;
  finalDensity: number;
  onBatchVolumeChange: (batchVolume: number) => void;
  onBoilTimeChange: (batchVolume: number) => void;
  onDensityChange: (density: number) => void;
  onFinalDensityChange: (finalDensity: number) => void;
}

const Params: React.FunctionComponent<Props> = ({
  batchVolume,
  boilTime,
  density,
  finalDensity,
  onBatchVolumeChange,
  onBoilTimeChange,
  onDensityChange,
  onFinalDensityChange,
}) => {
  calculatePlatoToOg(density);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h2>Parameters</h2>
      </Grid>
      <Grid item xs={2}>
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
      <Grid item xs={2}>
        <TextField
          InputProps={{
            endAdornment: <InputAdornment position="end">min</InputAdornment>,
          }}
          inputProps={{
            min: 0,
          }}
          label="Boil time"
          onChange={(event) => {
            onBoilTimeChange(Number(event.target.value));
          }}
          type="number"
          value={boilTime}
        />
      </Grid>
      <Grid item xs={2}>
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
      <Grid item xs={2}>
        <TextField
          fullWidth
          InputProps={{
            endAdornment: <InputAdornment position="end">°P</InputAdornment>,
          }}
          inputProps={{
            max: density,
            min: 0,
            step: 0.5,
          }}
          label="Final density"
          onChange={(event) => {
            onFinalDensityChange(Number(event.target.value));
          }}
          type="number"
          value={finalDensity}
        />
      </Grid>
      <Grid item xs={2}>
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
      <Grid item xs={2}>
        <TextField
          disabled
          InputProps={{
            endAdornment: <InputAdornment position="end">OG</InputAdornment>,
          }}
          label="Final density"
          type="number"
          value={calculatePlatoToOg(finalDensity).toFixed(3)}
        />
      </Grid>
    </Grid>
  );
};

export default Params;
