import { Container } from '@mantine/core';
import WalletCard from '../card/wallet-card.component';

export default function WalletsList(props: { accounts: any; }) {
    const { accounts } = props;
    console.log(accounts);
    return (
            <Container>
                {
                    accounts.map((acct: any) => (
                            <WalletCard account={acct} key={acct.pubKey} />
                        ))
                }
            </Container>);
}
