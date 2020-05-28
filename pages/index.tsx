import axios from "axios";
import { NextPage } from "next";
import React from "react";
import Head from "next/head";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const StyledPaper = styled(Paper)`
  margin-bottom: 2rem;
  margin-top: 2rem;
  min-height: calc(100vh - 4rem - 5rem);
  padding: 2rem;
`;

const Home: NextPage = () => (
  <div>
    <Head>
      <title>beer-calculator</title>
      <link href="/favicon.ico" rel="icon" />
    </Head>
    <Container>
      <StyledPaper>
        <Grid container>
          <Grid item xs={12}></Grid>
        </Grid>
      </StyledPaper>
    </Container>
  </div>
);

export default Home;
