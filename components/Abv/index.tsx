import React from 'react';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

import { calculateAlternateAbv, calculateStandardAbv } from '../../utils/abv';

interface Props {
  finalGravity: number;
  originalGravity: number;
}

const Abv: React.FunctionComponent<Props> = ({
  finalGravity,
  originalGravity,
}) => {
  const alternateAbv = calculateAlternateAbv({ finalGravity, originalGravity });
  const standardAbv = calculateStandardAbv({ finalGravity, originalGravity });
  const averageAbv = (alternateAbv + standardAbv) / 2;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h2>ABV</h2>
      </Grid>

      <Grid item>
        <TextField
          disabled
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          label="Standard"
          type="number"
          value={standardAbv.toFixed(2)}
        />
      </Grid>
      <Grid item>
        <TextField
          disabled
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          label="Alternate"
          type="number"
          value={alternateAbv.toFixed(2)}
        />
      </Grid>
      <Grid item>
        <TextField
          disabled
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          label="Average"
          type="number"
          value={averageAbv.toFixed(2)}
        />
      </Grid>
    </Grid>
  );
};

export default Abv;
