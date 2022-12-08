import { createStyles, Card,
    //Image, Avatar,
        Text, Group } from '@mantine/core';
import QRCode from 'react-qr-code';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
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

// interface ArticleCardVerticalProps {
//   image: string;
//   category: string;
//   title: string;
//   date: string;
//   author: {
//     name: string;
//     avatar: string;
//   };
// }

export default function WalletCard(props: { account: {
                                                address: string ;
                                                pubKey: string ;
                                                pk: string; }; }) {
  const { classes } = useStyles();
  return (
    <Card withBorder radius="md" p={0} className={classes.card}>
      <Group spacing={0}>
        <div style={{ height: 'auto', margin: '0 auto', maxWidth: 112, width: '100%' }}>
            <h3> Deposit To Address</h3>
            <QRCode
              size={512}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={props.account.address}
              viewBox="0 0 512 512"
            />
        </div>
        <div className={classes.body}>
          <Text weight={700} size="md">
            {props.account.address}
          </Text>
          <Text className={classes.title} mt="xs" mb="md">
            {props.account.pubKey}
          </Text>
          <Group noWrap spacing="xs">
            <Group spacing="xs" noWrap>
              {/* <Avatar size={20} src={author.avatar} /> */}
              <Text size="xs">{props.account.address}</Text>
            </Group>
            <Text size="xs" color="dimmed">
              •
            </Text>
            <Text size="xs" color="dimmed">
              {/* {date} */}
            </Text>
          </Group>
        </div>
        <div style={{ height: 'auto', margin: '0 auto', maxWidth: 112, width: '100%' }}>
            <h3> Spend With Private Key </h3>
            <QRCode
              size={512}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={props.account.pk}
              viewBox="0 0 512 512"
            />
        </div>
      </Group>
    </Card>
  );
}
