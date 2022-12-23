import { useState } from 'react';
import { Modal, useMantineColorScheme } from '@mantine/core';
import MintImage from './mint.component';

export default function MintModal({ open, handleClose, imageTitle, imageUrl, prompt }) {
  const { colorScheme } = useMantineColorScheme();
  return (
    <>
      <Modal
        opened={open}
        onClose={() => handleClose()}
        title="Mint This on Relayx.com"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
          color: theme.colorScheme === 'dark' ? theme.colors.yellow[2] : theme.colors.blue[2],
        })}
      >
        <MintImage imageUrl={imageUrl} imageName="out-0.png" prompt={prompt} close={handleClose} />
      </Modal>
    </>
  );
}
