import * as React from 'react';
import { Grid } from '@material-ui/core';

interface IYouTubeProps {
  link: string;
}

const YouTube = ({ link }: IYouTubeProps) => {
  const targetSrc: string = getTargetSrc(link);
  return (
    <Grid
    container
    direction="column"
    justify="center"
    alignItems="center"
  >
      <iframe
        width="560"
        height="315"
        src={ targetSrc }
      />
    </Grid>
  );
};


const getTargetSrc = (link: string): string => {
  const parts = link.split('/');
  return `https://www.youtube.com/embed/${parts[parts.length - 1]}`;
};

export default YouTube;
