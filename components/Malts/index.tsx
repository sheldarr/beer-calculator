import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import useSwr from 'swr';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import { PredefinedMalt } from '../../pages/api/malts';

export interface Malt {
  ebc: number;
  extract: number;
  name: string;
  weight: number;
}

interface Props {
  malts: Malt[];
  onMaltsChange: (malts: Malt[]) => void;
}

const fetcher = (url: string) => fetch(url).then((response) => response.json());

const Malts: React.FunctionComponent<Props> = ({ malts, onMaltsChange }) => {
  const { data: predefinedMalts, mutate } = useSwr<PredefinedMalt[]>(
    '/api/malts',
    fetcher,
    {
      initialData: [],
    },
  );

  mutate();

  const [predefinedMalt, setPredefinedMalt] = useState<
    PredefinedMalt | undefined
  >(undefined);

  useEffect(() => {
    const [anyMalt] = predefinedMalts;

    setPredefinedMalt(anyMalt);
  }, [predefinedMalts]);

  const addMalt = () => {
    onMaltsChange([...malts, { ...predefinedMalt, weight: 0 }]);
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
      <Grid item xs={12}>
        <h2>Malts</h2>
      </Grid>
      <Grid container item spacing={2} xs={12}>
        <Grid item md={4} sm={6} xs={10}>
          <Select
            displayEmpty
            fullWidth
            onChange={(event) => {
              setPredefinedMalt(event.target.value as PredefinedMalt);
            }}
            value={predefinedMalt || ''}
          >
            {predefinedMalts.map((malt) => (
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              <MenuItem key={malt.name} value={malt}>
                {malt.name} {malt.ebc} EBC {malt.extract}%
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={2}>
          <IconButton color="primary" onClick={addMalt}>
            <AddCircleIcon />
          </IconButton>
        </Grid>
      </Grid>
      {malts.map((malt, index) => (
        <Grid item key={index} spacing={2} xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Grid container key={index} spacing={2} xs={12}>
                <Grid item md={2} sm={4} xs={6}>
                  <TextField
                    disabled
                    label="Name"
                    type="text"
                    value={malt.name}
                  />
                </Grid>
                <Grid item md={2} sm={4} xs={6}>
                  <TextField
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">kg</InputAdornment>
                      ),
                    }}
                    inputProps={{
                      min: 0,
                      step: 0.1,
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
                <Grid item md={2} sm={4} xs={6}>
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
                <Grid item md={2} sm={4} xs={6}>
                  <TextField
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                    inputProps={{
                      max: 100,
                      min: 1,
                      step: 0.1,
                    }}
                    label="Extract"
                    onChange={(event) => {
                      updateMalt(index, {
                        ...malt,
                        extract: Number(event.target.value),
                      });
                    }}
                    type="number"
                    value={malt.extract}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                color="secondary"
                onClick={() => {
                  removeMalt(index);
                }}
              >
                Remove
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Malts;
