import { createStyles, Image, Accordion, Grid, Col, Container, Center, Title } from '@mantine/core';
import Welcome from '../components/Welcome/Welcome';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
  },

  title: {
    marginBottom: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  item: {
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
  },
}));

const placeholder =
  'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.';

const questions = [
    { question: 'What Is ASK HAPI?',
        answer: 'ASK HAPI is a simple way to ask AI to do things like create a profile picture, summarize a blogpost, compare pricing & features from websites, and so much more. You can ASK HAPI to write poems or create super-hero names, their origin stories and the graphics for your comic book masterpiece.  The only limts are your imagination.',
    },
    { question: 'Why Should I ASK HAPI? ',
        answer: 'Its true, there are other free options. Some of them are great. If theyre free, theyre harvesing your data. ',
    },
    { question: 'Does HAPI save my work?',
        answer: 'No. If ASK HAPI makes pictures for you they will be accessible through a 3rd party for some time. Other than that we dont save any info about your questions or work.',
    },
    { question: 'What Wallets Do You Support?',
        answer: "ASK HAPI will try to work with all web3 wallets. For now we support BSV Wallets. We support Relay on mobile. If you're using a Laptop or desktop we also support the Twetch & Sensilet Browser Extension wallets.",
    },
    { question: 'How do I use AskHapi on iOS?',
        answer: "Relay is the only wallet that works on mobile. Login with Relay you have to use Safari on iPhones and turn off 'cross site tracking'. \n Here are the steps to turn off cross-site tracking protection in Safari for iOS: \n On your iPhone or iPad, open the 'Settings' app. \n Tap 'Safari'. \n Scroll down and tap 'Privacy & Security'. \n Toggle the 'Prevent Cross-Site Tracking' switch to the off position.",
    },
    { question: 'How do I use AskHapi on Android?',
        answer: "Relay is the only wallet that works on mobile. Login with Relay you have to use Chrome on Android Phones and turn off 'cross site tracking'. \n Here are the steps to turn off cross-site tracking protection in Chrome for Android: \n On your Android device, open the Chrome app. \n Tap the three vertical dots in the top right corner of the screen. \n Tap 'Settings'. \n Tap 'Privacy'. \n Tap 'Ads'. \n Toggle the 'Opt out of Ads Personalization' switch to the off position.",
    },
];

export default function FaqWithImage() {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
        <Welcome />
      <Container size="lg">
        <Grid id="faq-grid" gutter={50}>
          <Col span={12} md={6}>
            <Center>
                <Image src="/hapi-error.png" alt="Frequently Asked Questions" style={{ maxWidth: '400px' }} />
            </Center>
          </Col>
          <Col span={12} md={6}>
            <Title order={2} align="left" className={classes.title}>
              Frequently Asked Questions
            </Title>

            <Accordion chevronPosition="right" defaultValue={questions[0].question} variant="separated">
              { questions.map((q) => (
                    <Accordion.Item className={classes.item} value={q.question}>
                        <Accordion.Control>{q.question}</Accordion.Control>
                        <Accordion.Panel style={{ flex: 1, flexWrap: 'wrap', whiteSpace: 'pre-wrap' }}>{q.answer}</Accordion.Panel>
                    </Accordion.Item>))
                }
            </Accordion>
          </Col>
        </Grid>
      </Container>
    </div>
  );
}
