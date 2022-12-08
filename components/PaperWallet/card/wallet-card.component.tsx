import { createStyles, Card, Center,
    //Image, Avatar,
        Text, Group } from '@mantine/core';
import QRCode from 'react-qr-code';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.blue, //theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    color: theme.white,
  },

  blueText: {
    color: theme.colors.blue,
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
}));

export default function WalletCard(props: { account: {
                                                address: string ;
                                                pubKey: string ;
                                                pk: string; }; }) {
  const { classes } = useStyles();
  return (
    <Card withBorder radius="md" p={0} className={classes.card}>
      <Group spacing={0}>
        <div style={{ height: 'auto', margin: '0 auto', maxWidth: 140, width: '100%' }}>
            <h3> Deposit To Address</h3>
            <QRCode
              size={140}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={props.account.address}
              viewBox="0 0 140 140"
            />
        </div>
        <div style={{ height: 'auto', margin: '0 auto', maxWidth: 140, width: '100%' }}>
            <h3> Spend With Private Key </h3>
            <QRCode
              size={140}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={props.account.pk}
              viewBox="0 0 140 140"
            />
        </div>
        <div className={classes.body} style={{ height: 'auto', margin: '0 auto', width: '300px', color: 'white' }}>
            <Center>
                <Text weight={700} size="md" style={{ flexWrap: 'wrap', wordBreak: 'break-all' }}>
                    <span>Address:</span> <br /> <span> {props.account.address}</span>
                </Text>
            </Center>
          <Center>
            <Text weight={700} size="md" style={{ paddingTop: '12px', flexWrap: 'wrap', wordBreak: 'break-all' }}>
                <span>Public Key:</span> <br /> <span> {props.account.pubKey}</span>
            </Text>
          </Center>
          <Center>
            <Text weight={700} size="md" style={{ paddingTop: '12px', flexWrap: 'wrap', wordBreak: 'break-all' }}>
                <span>Private Key:</span> <br /> <span> {props.account.pk}</span>
            </Text>
          </Center>
        </div>
      </Group>
    </Card>
  );
}
