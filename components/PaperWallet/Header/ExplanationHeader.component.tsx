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

  export function ExplainationHeader() {
    const { classes } = useStyles();
    function onClickHandler(e:React.MouseEvent<HTMLElement>) {
      console.log(e.target);
      return e;
    }
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
                  <b>Private Key</b> - A Private Key is used to spend your bitcoin,
                  never share this with anyone,
                  only use this in a trusted wallet
                </List.Item>
                <List.Item>
                  <b>Public Key</b> –
                   Used to prove that signatures came from someone with control of the Private Key
                </List.Item>
                <List.Item>
                  <b>No annoying focus ring</b> –
                   focus ring will appear only when user navigates with
                   keyboard
                </List.Item>
              </List>

              <Group mt={30}>
                <Button radius="xl" size="md" className={classes.control}>
                  Get started
                </Button>
                <Button onClick={onClickHandler} variant="gradient" radius="xl" size="md" className={classes.control}>
                  Source code
                </Button>
              </Group>
            </div>
            <Image src="https://slavettes-layers.s3.amazonaws.com/pewnicorns/Poo-transparent.png" className={classes.image} radius="xl" />
          </div>
        </Container>
      </div>
    );
  }
