import React from 'react';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';

import {
  ebcToSrm,
  kgToLbs,
  srmToLovibond,
} from '../../../utils/unitConverters';

export interface Malt {
  ebc: number;
  weight: number;
}

interface Props {
  malts: Malt[];
  onMaltsChange: (malts: Malt[]) => void;
}

const Malts: React.FunctionComponent<Props> = ({ malts, onMaltsChange }) => {
  const addMalt = () => {
    onMaltsChange([
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

    onMaltsChange(newMalts);
  };

  const removeMalt = (index: number) => {
    const newMalts = malts.filter((malt, maltIndex) => {
      return maltIndex !== index;
    });

    onMaltsChange(newMalts);
  };

  return (
    <Grid container spacing={2}>
      <Grid container item xs={12}>
        <Grid item>
          <h2>Malts</h2>
        </Grid>
        <Grid item></Grid>
        <IconButton color="primary" onClick={addMalt}>
          <AddCircleIcon />
        </IconButton>
      </Grid>
      {malts.map((malt, index) => (
        <Grid container item key={index} spacing={2}>
          <Grid item>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">EBC</InputAdornment>
                ),
              }}
              inputProps={{
                min: 1,
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
              inputProps={{
                min: 0,
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
    </Grid>
  );
};

export default Malts;
