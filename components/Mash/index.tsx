import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import { Malt } from '../Malts';

interface Props {
  batchVolume: number;
  malts: Malt[];
  onEstimatedDensityChange: (estimatedDensity: number) => void;
}

const EVAPORATION_LOSS_FACTOR = 0.15;
const FILTRATION_LOSS_FACTOR = 0.7;
const COOLING_LOSS_FACTOR = 0.04;
const OTHER_LOSS_FACTOR = 0.1;

const Mash: React.FunctionComponent<Props> = ({
  batchVolume,
  malts,
  onEstimatedDensityChange,
}) => {
  const [efficiency, setEfficiency] = useState(70);
  const [waterGrainRatio, setWaterGrainRatio] = useState(2.5);

  const [theoreticalExtract, realExtract, totalWeight] = malts.reduce(
    ([theoreticalExtract, realExtract, totalWeight], malt) => {
      return [
        theoreticalExtract + malt.extract * malt.weight * 10,
        realExtract + (malt.extract * malt.weight * efficiency) / 10,
        totalWeight + malt.weight,
      ];
    },
    [0, 0, 0],
  );

  const millilitersOfExtract = realExtract / 1.587;
  const waterInWort = batchVolume * 1000 - millilitersOfExtract;
  const wortWeight = waterInWort + realExtract;
  const estimatedDensity = (realExtract / wortWeight) * 100;

  const mashWater = totalWeight * waterGrainRatio;
  const filtrationLoss = totalWeight * FILTRATION_LOSS_FACTOR;
  const evaporationLoss =
    batchVolume / (1 - EVAPORATION_LOSS_FACTOR) - batchVolume;
  const spargeWater =
    batchVolume + filtrationLoss + evaporationLoss - mashWater;
  const coolingLoss = batchVolume * COOLING_LOSS_FACTOR;
  const otherLoss = batchVolume * OTHER_LOSS_FACTOR;
  const estimatedBeerVolume = batchVolume - coolingLoss - otherLoss;

  useEffect(() => {
    onEstimatedDensityChange(Number(estimatedDensity.toFixed(2)));
  }, [estimatedDensity]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h2>Mash</h2>
      </Grid>
      <Grid item md={2} sm={4} xs={6}>
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
      <Grid item md={2} sm={4} xs={6}>
        <TextField
          fullWidth
          inputProps={{
            max: 5,
            min: 1,
            step: 0.1,
          }}
          label="Water/Grain ratio"
          onChange={(event) => {
            setWaterGrainRatio(Number(event.target.value));
          }}
          type="number"
          value={waterGrainRatio.toFixed(2)}
        />
      </Grid>
      <Grid item md={2} sm={4} xs={6}>
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
      <Grid item md={2} sm={4} xs={6}>
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
      <Grid item md={2} sm={4} xs={6}>
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
      <Grid item md={2} sm={4} xs={6}>
        <TextField
          disabled
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
          label="Total weight"
          type="number"
          value={totalWeight.toFixed(2)}
        />
      </Grid>

      <Grid item md={2} sm={4} xs={6}>
        <TextField
          disabled
          InputProps={{
            endAdornment: <InputAdornment position="end">l</InputAdornment>,
          }}
          label="Mash water"
          type="number"
          value={mashWater.toFixed(2)}
        />
      </Grid>
      <Grid item md={2} sm={4} xs={6}>
        <TextField
          disabled
          InputProps={{
            endAdornment: <InputAdornment position="end">l</InputAdornment>,
          }}
          label="Sparge water"
          type="number"
          value={spargeWater.toFixed(2)}
        />
      </Grid>
      <Grid item md={2} sm={4} xs={6}>
        <TextField
          disabled
          InputProps={{
            endAdornment: <InputAdornment position="end">l</InputAdornment>,
          }}
          label="Estimated beer volume"
          type="number"
          value={estimatedBeerVolume.toFixed(2)}
        />
      </Grid>
    </Grid>
  );
};

export default Mash;
