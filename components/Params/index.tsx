import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import useSwr from 'swr';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

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
  onYeastChange: (yeast: string) => void;
  yeast: string;
}

const fetcher = (url: string) => fetch(url).then((response) => response.json());

const Params: React.FunctionComponent<Props> = ({
  batchVolume,
  boilTime,
  density,
  finalDensity,
  onBatchVolumeChange,
  onBoilTimeChange,
  onDensityChange,
  onFinalDensityChange,
  onYeastChange,
  yeast,
}) => {
  const { data: yeasts, mutate } = useSwr<string[]>('/api/yeasts', fetcher, {
    initialData: [],
  });

  useEffect(() => {
    mutate();
  }, []);

  useEffect(() => {
    const [yeast] = yeasts;

    onYeastChange(yeast);
  }, [yeasts]);

  calculatePlatoToOg(density);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h2>Parameters</h2>
      </Grid>
      <Grid item md={2} sm={4} xs={6}>
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
      <Grid item md={2} sm={4} xs={6}>
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
      <Grid item md={2} sm={4} xs={6}>
        <TextField
          InputProps={{
            endAdornment: <InputAdornment position="end">°P</InputAdornment>,
          }}
          inputProps={{
            min: 0,
            step: 0.1,
          }}
          label="Density"
          onChange={(event) => {
            onDensityChange(Number(event.target.value));
          }}
          type="number"
          value={density}
        />
      </Grid>
      <Grid item md={2} sm={4} xs={6}>
        <TextField
          fullWidth
          InputProps={{
            endAdornment: <InputAdornment position="end">°P</InputAdornment>,
          }}
          inputProps={{
            max: density,
            min: 0,
            step: 0.1,
          }}
          label="Final density"
          onChange={(event) => {
            onFinalDensityChange(Number(event.target.value));
          }}
          type="number"
          value={finalDensity}
        />
      </Grid>
      <Grid item md={2} sm={4} xs={6}>
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
      <Grid item md={2} sm={4} xs={6}>
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
      <Grid item md={2} sm={4} xs={6}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Yeast
        </InputLabel>
        <Select
          displayEmpty
          fullWidth
          onChange={(event) => {
            onYeastChange(event.target.value as string);
          }}
          value={yeast}
        >
          {yeasts.map((yeast) => (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <MenuItem key={yeast} value={yeast}>
              {yeast}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
};

export default Params;
