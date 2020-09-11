import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import {
  calculateRager,
  calculateTinseth,
  IbuParams,
  Minutes,
} from '../../../utils/ibu';
import { Hop } from '../Hops';

interface Props {
  batchVolume: number;
  boilTime: Minutes;
  hops: Hop[];
  originalGravity: number;
}

const IBU: React.FunctionComponent<Props> = ({
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
        boilTime,
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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h2>IBU</h2>
      </Grid>
      <Grid item>
        <TextField
          disabled
          label="Rager"
          type="number"
          value={ibuRager.toFixed(2)}
        />
      </Grid>
      <Grid item>
        <TextField
          disabled
          label="Tinseth"
          type="number"
          value={ibuTinseth.toFixed(2)}
        />
      </Grid>
    </Grid>
  );
};

export default IBU;
