import { createStyles, Center, Button, Image, Container, Text, Textarea } from '@mantine/core';
import Head from 'next/head';
import { useEffect, useState } from 'react';

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
export default function AskHapi() {
    const { classes } = useStyles();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const [userInput, setUserInput] = useState('Create a list of 5 reasons to love TV');
    const [prompt, setPrompt] = useState();
    const [dataFinishReason, setDataFinishReason] = useState();
    function onTextChanged(e) {
        console.log(e.target.value);
        setUserInput(e.target.value);
    }
    async function generateResponse(event) {
        event.preventDefault();
        setLoading(true);
    //    let paid = false;
    //     paid = await pay();
        setResult('');
        const response = await fetch('/api/generateStory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description: userInput, previous: result }),
        });
        const data = await response.json();
        setResult(data.result);
        setDataFinishReason(data.finish_reason);
        setLoading(false);
    }
    return (
        <div>
            <Container>
                <div className={classes.inner}>
                    <div className={classes.content} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className={classes.imageContainer}>
                            {loading
                                ? <Image className={classes.image} src="/hapi-error.png" />
                                : <Image className={classes.image} src="/hapi-neutral.png" />
                            }
                        </div>
                    </div>
                </div>
                <div>
                <Textarea
                  onChange={onTextChanged}
                  placeholder="What can I do for you, my human overlord?"
                  label="Ask HAPI to create anything"
                  withAsterisk
                />
                <div>
                    <Center>
                        <div style={{ margin: '12px' }}>
                            <Button variant="gradient" onClick={generateResponse}>ASK HAPI</Button>
                        </div>
                    </Center>
                </div>
                </div>
                <div className={classes.results}>
                    {result.split('\n').map(place => <p> {place} </p>)}
                </div>
            </Container>
        </div>
    );
}
