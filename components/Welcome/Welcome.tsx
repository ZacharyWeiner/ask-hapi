import { Title, Text } from '@mantine/core';
import useStyles from './Welcome.styles';

export function Welcome(props) {
  const { classes } = useStyles();

  return (
    <>
      <Title className={classes.title} align="center" mt={24}>
        Ask {' '}
        <Text inherit variant="gradient" component="span">
          HAPI
        </Text>
      </Title>
      <Text color="dimmed" align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt="xl">
        {props.subtext}
         {/* For some ideas{' '}
        <Anchor href="https://mantine.dev/guides/next/" size="lg">
           click here
        </Anchor> */}
      </Text>
    </>
  );
}
