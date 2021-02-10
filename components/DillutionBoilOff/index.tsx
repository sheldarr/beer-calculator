import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

interface Props {
  batchVolume: number;
  density: number;
}

const DillutionBoilOff: React.FunctionComponent<Props> = ({
  batchVolume,
  density,
}) => {
  const [targetDensity, setTargetDensity] = useState(density);
  const [correction, setCorrection] = useState(0);

  useEffect(() => {
    setCorrection(((density - targetDensity) / targetDensity) * batchVolume);
  }, [batchVolume, density, targetDensity]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h2>Dillution & Boill Off</h2>
      </Grid>
      <Grid item md={2} sm={4} xs={6}>
        <TextField
          disabled
          InputProps={{
            endAdornment: <InputAdornment position="end">l</InputAdornment>,
          }}
          label="Batch volume"
          type="number"
          value={batchVolume.toFixed(2)}
        />
      </Grid>
      <Grid item md={2} sm={4} xs={6}>
        <TextField
          disabled
          InputProps={{
            endAdornment: <InputAdornment position="end">°P</InputAdornment>,
          }}
          label="Density"
          type="number"
          value={density.toFixed(2)}
        />
      </Grid>
      <Grid item md={2} sm={4} xs={6}>
        <TextField
          fullWidth
          InputProps={{
            endAdornment: <InputAdornment position="end">°P</InputAdornment>,
          }}
          inputProps={{
            min: 0,
            step: 0.1,
          }}
          label="Target density"
          onChange={(event) => {
            setTargetDensity(Number(event.target.value));
          }}
          type="number"
          value={targetDensity.toFixed(2)}
        />
      </Grid>
      <Grid item md={2} sm={4} xs={6}>
        <TextField
          disabled
          InputProps={{
            endAdornment: <InputAdornment position="end">l</InputAdornment>,
          }}
          label="Correction"
          type="number"
          value={correction.toFixed(2)}
        />
      </Grid>
    </Grid>
  );
};

export default DillutionBoilOff;
