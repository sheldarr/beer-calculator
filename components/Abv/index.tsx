import React from 'react';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import styled from 'styled-components';

import { calculateAlternateAbv, calculateStandardAbv } from '../../utils/abv';
import { calculatePlatoToOg } from '../../utils/unitConverters';

const ChartContainer = styled.div`
  padding-top: 1rem;
`;

const sortDesc = (a: number, b: number) => b - a;

interface Props {
  finalDensity: number;
  originalDensity: number;
}

const Abv: React.FunctionComponent<Props> = ({
  finalDensity,
  originalDensity,
}) => {
  const originalGravity = calculatePlatoToOg(originalDensity);
  const finalGravity = calculatePlatoToOg(finalDensity);

  const alternateAbv = calculateAlternateAbv({ finalGravity, originalGravity });
  const standardAbv = calculateStandardAbv({ finalGravity, originalGravity });
  const averageAbv = (alternateAbv + standardAbv) / 2;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const abvData = [...Array(Math.ceil(originalDensity * 2) + 1).keys()]
    .map((density) => density / 2)
    .sort(sortDesc)
    .map((density) => {
      const abvAlternate = calculateAlternateAbv({
        finalGravity: calculatePlatoToOg(density),
        originalGravity,
      });
      const abvStandard = calculateStandardAbv({
        finalGravity: calculatePlatoToOg(density),
        originalGravity,
      });
      const abvAverate = (abvAlternate + abvStandard) / 2;
      return {
        alternate: abvAlternate,
        average: abvAverate,
        finalDensity: density,
        standard: abvStandard,
      };
    });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h2>ABV</h2>
      </Grid>
      <Grid item md={2} sm={4} xs={6}>
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
      <Grid item md={2} sm={4} xs={6}>
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
      <Grid item md={2} sm={4} xs={6}>
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
      <Grid item xs={12}>
        <ChartContainer>
          <ResponsiveContainer height={160} width="100%">
            <LineChart data={abvData}>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Line
                dataKey="average"
                dot={false}
                name="Average"
                stroke="purple"
                type="monotone"
              />
              <Line
                dataKey="alternate"
                dot={false}
                name="Alternate"
                stroke="green"
                type="monotone"
              />
              <Line
                dataKey="standard"
                dot={false}
                name="Standard"
                stroke="blue"
                type="monotone"
              />
              <ReferenceLine
                label="End of fermentation"
                stroke="red"
                x={finalDensity}
              />
              <XAxis dataKey="finalDensity" />
              <YAxis width={15} />
              <Tooltip
                labelFormatter={(finalDensity) =>
                  `Final density: ${finalDensity}°P`
                }
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Grid>
    </Grid>
  );
};

export default Abv;
