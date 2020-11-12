import React from 'react';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { KeyboardDatePicker } from '@material-ui/pickers';

export interface FermentationEntry {
  date: Date;
  density: number;
}

interface Props {
  density: number;
  entries: FermentationEntry[];
  onEntriesChange: (entries: FermentationEntry[]) => void;
}

const Fermentation: React.FunctionComponent<Props> = ({
  density,
  entries,
  onEntriesChange,
}) => {
  const addEntry = (entry: FermentationEntry) => {
    onEntriesChange([...entries, entry]);
  };

  const updateEntry = (index: number, newEntry: FermentationEntry) => {
    const newEntries = entries.map((entry, entryIndex) => {
      if (entryIndex === index) {
        return {
          ...entry,
          ...newEntry,
        };
      }

      return entry;
    });

    onEntriesChange(newEntries);
  };

  const removeEntry = (index: number) => {
    const newEntries = entries.filter((entry, entryIndex) => {
      return entryIndex !== index;
    });

    onEntriesChange(newEntries);
  };

  return (
    <Grid container spacing={2}>
      <Grid container item>
        <Grid item>
          <h2>Fermentation</h2>
        </Grid>
        <Grid item>
          <IconButton
            color="primary"
            onClick={() => {
              addEntry({
                date: new Date(),
                density,
              });
            }}
          >
            <AddCircleIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item xs={12}></Grid>
      {entries.map((entry, index) => (
        <Grid item key={index} xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Grid container key={index} spacing={2}>
                <Grid item md={2} sm={4} xs={6}>
                  <KeyboardDatePicker
                    fullWidth
                    format="dd/MM/yyyy"
                    label="Date"
                    onChange={(date) => {
                      updateEntry(index, {
                        ...entry,
                        date,
                      });
                    }}
                    value={entry.date}
                  />
                </Grid>
                <Grid item md={2} sm={4} xs={6}>
                  <TextField
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">°P</InputAdornment>
                      ),
                    }}
                    inputProps={{
                      max: density,
                      min: 0,
                      step: 0.1,
                    }}
                    label="Density"
                    onChange={(event) => {
                      updateEntry(index, {
                        ...entry,
                        density: Number(event.target.value),
                      });
                    }}
                    type="number"
                    value={entry.density}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                color="secondary"
                onClick={() => {
                  removeEntry(index);
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

export default Fermentation;
