import React from 'react';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';

export interface Hop {
  alphaAcids: number;
  weight: number;
}

interface Props {
  hops: Hop[];
  onHopsChange: (hops: Hop[]) => void;
}

const Hops: React.FunctionComponent<Props> = ({ hops, onHopsChange }) => {
  const addHop = () => {
    onHopsChange([
      ...hops,
      {
        alphaAcids: 0,
        weight: 0,
      },
    ]);
  };

  const updateHop = (index: number, newHop: Hop) => {
    const newHops = hops.map((hop, hopIndex) => {
      if (hopIndex === index) {
        return {
          ...hop,
          ...newHop,
        };
      }

      return hop;
    });

    onHopsChange(newHops);
  };

  const removeHop = (index: number) => {
    const newHops = hops.filter((hop, hopIndex) => {
      return hopIndex !== index;
    });

    onHopsChange(newHops);
  };

  return (
    <Grid container spacing={2}>
      <Grid container item xs={12}>
        <Grid item>
          <h2>Hops</h2>
        </Grid>
        <Grid item></Grid>
        <IconButton color="primary" onClick={addHop}>
          <AddCircleIcon />
        </IconButton>
      </Grid>
      {hops.map((hop, index) => (
        <Grid container item key={index} spacing={2}>
          <Grid item>
            <TextField
              InputProps={{
                endAdornment: <InputAdornment position="end">g</InputAdornment>,
              }}
              inputProps={{
                min: 0,
              }}
              label="Weight"
              onChange={(event) => {
                updateHop(index, {
                  ...hop,
                  weight: Number(event.target.value),
                });
              }}
              type="number"
              value={hop.weight}
            />
          </Grid>
          <Grid item>
            <TextField
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              inputProps={{
                min: 0,
                step: 0.1,
              }}
              label="Alpha acids"
              onChange={(event) => {
                updateHop(index, {
                  ...hop,
                  alphaAcids: Number(event.target.value),
                });
              }}
              type="number"
              value={hop.alphaAcids}
            />
          </Grid>
          <Grid item>
            <IconButton
              color="secondary"
              onClick={() => {
                removeHop(index);
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

export default Hops;
