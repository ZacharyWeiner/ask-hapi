//import { useState, useEffect } from 'react';
import {
    createStyles,
    Image,
    Container,
    Title,
    Button,
    Group,
    Text,
    List,
    ThemeIcon,
  } from '@mantine/core';
  import { IconCheck } from '@tabler/icons';

  const useStyles = createStyles((theme) => ({
    inner: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: theme.spacing.xl * 4,
      paddingBottom: theme.spacing.xl * 4,
    },

    content: {
      maxWidth: 480,
      marginRight: theme.spacing.xl * 3,

      [theme.fn.smallerThan('md')]: {
        maxWidth: '100%',
        marginRight: 0,
      },
    },

    title: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontSize: 48,
      lineHeight: 1.2,
      fontWeight: 900,

      [theme.fn.smallerThan('xs')]: {
        fontSize: 28,
      },
    },

    control: {
      [theme.fn.smallerThan('xs')]: {
        flex: 1,
      },
    },

    image: {
      flex: 1,

      [theme.fn.smallerThan('md')]: {
        display: 'none',
      },
    },

    highlight: {
      position: 'relative',
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      borderRadius: theme.radius.sm,
      padding: '4px 12px',
    },
  }));

  export function ExplainationHeader(props: any) {
    const { classes } = useStyles();
    return (
      <div>
        <Container>
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title}>
                A <span className={classes.highlight}>BitcoinSV</span>  <br />Paper Wallet Generator
              </Title>
              <Text color="dimmed" mt="md">
               Create paper Wallets to Store Your BitcoinSV offline
               and without a web service wallet.
              </Text>

              <List
                mt={30}
                spacing="sm"
                size="sm"
                icon={
                  <ThemeIcon size={20} radius="xl">
                    <IconCheck size={12} stroke={1.5} />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <b>The Most Secure</b> - Paper wallets are the most secure wallet.
                  If you never import your private key, it will never be exposed.
                </List.Item>
                <List.Item>
                  <b>Create Offline</b> –
                   Once this page is loaded you can turn off your WIFI & Cell network.
                   After turning off your network
                   (or going into airplane mode) you can generate the wallets.
                   Save a screenshot of the page & clear the list.
                   Then turn WIFI back on.
                   Your wallets were created offline, and all evidence
                   on the website was destroyed before you cameback online
                </List.Item>
                <List.Item>
                  <b>No Seed Just Keys</b> –
                   If you generate keys from a seed.
                   exposing your seed will expose all the private keys generated from that seed.
                   This paper wallet generates 10 random
                   private key so that no one cantrace them back to one origin.
                </List.Item>
              </List>

              <Group mt={30}>
                <Button radius="xl" size="md" variant="gradient" className={classes.control} onClick={props.onClickHandler}>
                  Create
                </Button>
                {/* <Button onClick={props.onClickHandler}  radius="xl" size="md" className={classes.control}>
                  Source code
                </Button> */}
              </Group>
            </div>
            <Image src="/hapi-neutral.png" className={classes.image} radius="xl" />
          </div>
        </Container>
      </div>
    );
  }
