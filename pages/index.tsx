import Script from 'next/script';
import Link from 'next/link';
import { useState } from 'react';
import { IconSettings } from '@tabler/icons';
import { createStyles, ActionIcon, Button, Modal, Group } from '@mantine/core';
import { Welcome } from '../components/Welcome/Welcome';
//import { HeroBullets } from '../components/HeroWithBullets/HeroWithBullets.component';
import AskHapi from '../components/AskHapi/AskHapi.component';
import WalletDetection from '../components/WalletDetection/WalletDetection.component';
import Settings from '../components/Settings/Settings.component';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
}));
export default function HomePage() {
  const [model, setModel] = useState('text-davinci-003');
  const [temperature, setTemperature] = useState(0.8);
  const [maxTokens, setMaxTokens] = useState(400);
  const [frequencyPenalty, setFrequencyPentaly] = useState(0.5);
  const [presencePenalty, setPresencePentaly] = useState(0.5);
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);

  function handleModelChanged(value:string) {
    setModel(value);
  }
  function handleTemperatureChanged(value:number) {
    setTemperature(value);
  }
  function handleMaxTokensChanged(value:number) {
    setMaxTokens(value);
  }
  function handleFrequencyPenaltyChanged(value:number) {
    setFrequencyPentaly(value);
  }
  function handlePresencePenaltyChanged(value:number) {
    setPresencePentaly(value);
  }
  return (
    <div>
      <div className={classes.inner}>
        <WalletDetection />
        <ActionIcon
          onClick={() => setOpened(true)}
          size="xl"
        >
          <IconSettings size={20} stroke={1.5} />
        </ActionIcon>
      </div>
      <Welcome />
      <AskHapi
        model={model}
        temperature={temperature}
        maxTokens={maxTokens}
        frequencyPenalty={frequencyPenalty}
        presencePenalty={presencePenalty}
      />
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        fullScreen
      >
        <Settings
          model={model}
          temperature={temperature}
          maxTokens={maxTokens}
          frequencyPenalty={frequencyPenalty}
          presencePenalty={presencePenalty}
          onModelChanged={handleModelChanged}
          onTemperatureChange={handleTemperatureChanged}
          onMaxTokensChange={handleMaxTokensChanged}
          onFrequencyPenaltyChange={handleFrequencyPenaltyChanged}
          onPresencePenaltyChange={handlePresencePenaltyChanged}
        />
      </Modal>
      <Script src="https://one.relayx.io/relayone.js " strategy="lazyOnload" />
    </div>
  );
}
