import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import useSwr from 'swr';

import { Minutes } from '../../utils/ibu';
import { PredefinedHop } from '../../pages/api/hops';

export interface Hop {
  alphaAcids: number;
  boilTime: Minutes;
  name: string;
  weight: number;
}

interface Props {
  boilTime: Minutes;
  hops: Hop[];
  onHopsChange: (hops: Hop[]) => void;
}

const DEFAULT_HOP_WEIGHT = 30;

const fetcher = (url: string) => fetch(url).then((response) => response.json());

const Hops: React.FunctionComponent<Props> = ({
  boilTime,
  hops,
  onHopsChange,
}) => {
  const { data: predefinedHops, mutate } = useSwr<PredefinedHop[]>(
    '/api/hops',
    fetcher,
    {
      initialData: [],
    },
  );

  mutate();

  const [predefinedHop, setPredefinedHop] = useState<PredefinedHop | undefined>(
    undefined,
  );

  useEffect(() => {
    const [anyHop] = predefinedHops;

    setPredefinedHop(anyHop);
  }, [predefinedHops]);

  const addHop = () => {
    onHopsChange([
      ...hops,
      {
        ...predefinedHop,
        boilTime,
        weight: DEFAULT_HOP_WEIGHT,
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
      <Grid item xs={12}>
        <h2>Hops</h2>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item>
          <Select
            displayEmpty
            onChange={(event) => {
              setPredefinedHop(event.target.value as PredefinedHop);
            }}
            value={predefinedHop || ''}
          >
            {predefinedHops.map((hop) => (
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              <MenuItem key={hop.name} value={hop}>
                {hop.name} {hop.alphaAcids}%
              </MenuItem>
            ))}
          </Select>
          <IconButton color="primary" onClick={addHop}>
            <AddCircleIcon />
          </IconButton>
        </Grid>
      </Grid>
      {hops.map((hop, index) => (
        <Grid container item key={index} spacing={2}>
          <Grid item xs={2}>
            <TextField disabled label="Name" type="text" value={hop.name} />
          </Grid>
          <Grid item xs={2}>
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
          <Grid item xs={2}>
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
          <Grid item xs={2}>
            <TextField
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">min</InputAdornment>
                ),
              }}
              inputProps={{
                max: boilTime,
                min: 1,
              }}
              label="Boil time"
              onChange={(event) => {
                updateHop(index, {
                  ...hop,
                  boilTime: Number(event.target.value),
                });
              }}
              type="number"
              value={hop.boilTime}
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
