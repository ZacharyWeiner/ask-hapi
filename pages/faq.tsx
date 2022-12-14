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
                        <Accordion.Panel>{q.answer}</Accordion.Panel>
                    </Accordion.Item>))
                }
            </Accordion>
          </Col>
        </Grid>
      </Container>
    </div>
  );
}
