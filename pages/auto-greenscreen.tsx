import Script from 'next/script';
import { useState } from 'react';
import { IconSettings, IconArrowBack } from '@tabler/icons';
import { createStyles, ActionIcon,
  Button,
  Modal,
  Container,
  Center,
  Image,
  //Group,
  keyframes,
  TextInput,
  Text,
} from '@mantine/core';
import Welcome from '../components/Welcome/Welcome';
import VideoMaskComponent from '../components/AskHapi/VideoMask.component';

export const bounce = keyframes({
    'from, 20%, 53%, 80%, to': { transform: 'translate3d(0, 0, 0)' },
    '40%, 43%': { transform: 'translate3d(0, -30px, 0)' },
    '70%': { transform: 'translate3d(0, -15px, 0)' },
    '90%': { transform: 'translate3d(0, -4px, 0)' },
  });
const useStyles = createStyles((theme) => ({
    inner: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.xl,
    },

    content: {
      maxWidth: 480,
      marginRight: 'auto',
      marginLeft: 'auto',

      [theme.fn.smallerThan('md')]: {
        maxWidth: '100%',
        marginRight: 0,
      },
    },

    results: {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      borderRadius: theme.radius.lg,
      padding: '4px 12px',
      maxWidth: '100%',
      flex: 1,
      flexWrap: 'wrap',
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

      },
    },
    imageBounce: {
      flex: 1,
      animation: `${bounce} 3s ease-in-out infinite`,
      [theme.fn.smallerThan('md')]: {

      },
    },

    imageContainer: {
        height: '150px',
        width: '150px',
    },

    highlight: {
      position: 'relative',
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      borderRadius: theme.radius.lg,
      padding: '4px 12px',
      whiteSpace: 'pre',
    },
  }));
export default function UpgradeFace() {
    const { classes } = useStyles();
    const [loading, setLoading] = useState(false);
    return (
        <div>
        <Welcome subtext="Use AI to Fix A Face " />
        <Container>
            <div className={classes.inner}>
                <div className={classes.content} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                    <div className={classes.imageContainer}>
                        {loading
                            ? <Image className={classes.imageBounce} src="/hapi-error.png" />
                            : <Image className={classes.image} src="/hapi-neutral.png" />}
                    </div>
                </div>
            </div>
            <Center>
                <Button
                  component="a"
                  href="/"
                  leftIcon={<IconArrowBack size={18} />}
                  styles={(theme) => ({
                        root: {
                            backgroundColor: '#00acee',
                            border: 0,
                            height: 42,
                            paddingLeft: 20,
                            paddingRight: 20,
                            marginLeft: 12,
                            marginTop: 12,

                            '&:hover': {
                                backgroundColor: theme.fn.darken('#00acee', 0.05),
                            },
                        },

                        leftIcon: {
                            marginRight: 15,
                        },
                    })}
                >
                    Home
                </Button>
            </Center>
            <Center><Text style={{ color: 'red' }}> *videos over 1 minute will fail. </Text></Center>
            <Center>
                <VideoMaskComponent
                  onLoadingChanged={setLoading}
                  endPoint="/api/predictions/green-screen"
                  displayType="video"
                  satoshis={1000000}
                  buttonText="Auto Green Screen $5"
                  defaultUrl="https://slavettes-layers.s3.amazonaws.com/pewnicorns/samplevideo.mp4"
                />
            </Center>
        </Container>
        <Script src="https://one.relayx.io/relayone.js " strategy="lazyOnload" />
        </div>
    );
}
