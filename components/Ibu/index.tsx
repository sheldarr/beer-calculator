import React from 'react';
import Grid from '@material-ui/core/Grid';
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

import {
  calculateRager,
  calculateTinseth,
  IbuParams,
  Minutes,
} from '../../utils/ibu';
import { Hop } from '../Hops';

interface Props {
  batchVolume: number;
  boilTime: Minutes;
  hops: Hop[];
  originalGravity: number;
}

const Ibu: React.FunctionComponent<Props> = ({
  batchVolume,
  boilTime,
  hops,
  originalGravity,
}) => {
  const [ibuRager, ibuTinseth] = hops.reduce(
    ([ibuRager, ibuTinseth], hop) => {
      const ibuParams: IbuParams = {
        alphaAcids: hop.alphaAcids / 100,
        batchVolume,
        boilTime: hop.boilTime,
        hopWeight: hop.weight,
        originalGravity,
      };

      return [
        ibuRager + calculateRager(ibuParams),
        ibuTinseth + calculateTinseth(ibuParams),
      ];
    },
    [0, 0],
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const boilMinutes = [...Array(120).keys()];
  const ibuData = boilMinutes.map((minute) => {
    const [ibuRager, ibuTinseth] = hops.reduce(
      ([ibuRager, ibuTinseth], hop) => {
        const hopBoilTime = minute - (boilTime - hop.boilTime);

        if (hopBoilTime < 0) {
          return [ibuRager, ibuTinseth];
        }

        const ibuParams: IbuParams = {
          alphaAcids: hop.alphaAcids / 100,
          batchVolume,
          boilTime: hopBoilTime,
          hopWeight: hop.weight,
          originalGravity,
        };

        return [
          ibuRager + calculateRager(ibuParams),
          ibuTinseth + calculateTinseth(ibuParams),
        ];
      },
      [0, 0],
    );

    return {
      average: (ibuRager + ibuTinseth) / 2,
      label: 'IBU',
      minute,
      rager: ibuRager,
      tinseth: ibuTinseth,
    };
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h2>IBU</h2>
      </Grid>

      <Grid item xs={2}>
        <TextField
          disabled
          label="Rager"
          type="number"
          value={ibuRager.toFixed(2)}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          disabled
          label="Tinseth"
          type="number"
          value={ibuTinseth.toFixed(2)}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          disabled
          label="Average"
          type="number"
          value={((ibuRager + ibuTinseth) / 2).toFixed(2)}
        />
      </Grid>
      <Grid item xs={12}>
        <ResponsiveContainer height={500} width="100%">
          <LineChart
            data={ibuData}
            margin={{ bottom: 50, left: 10, right: 10, top: 50 }}
          >
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Line
              dataKey="average"
              dot={false}
              name="Average"
              stroke="purple"
              type="monotone"
            />
            <Line
              dataKey="rager"
              dot={false}
              name="Rager"
              stroke="green"
              type="monotone"
            />
            <Line
              dataKey="tinseth"
              dot={false}
              name="Tinseth"
              stroke="blue"
              type="monotone"
            />
            <ReferenceLine label="End of boil" stroke="red" x={boilTime} />
            <XAxis dataKey="minute" />
            <YAxis />
            <Tooltip labelFormatter={(time) => `Boil time: ${time}min`} />
          </LineChart>
        </ResponsiveContainer>
      </Grid>
    </Grid>
  );
};

export default Ibu;
