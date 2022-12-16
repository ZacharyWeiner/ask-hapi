import { useState } from 'react';
import { Modal } from '@mantine/core';
import MintImage from './mint.component';

export default function MintModal({ open, handleClose, imageTitle, imageUrl, prompt }) {
  return (
    <>
      <Modal
        opened={open}
        onClose={() => handleClose()}
        title="Mint an NFT"
      >
        <MintImage imageUrl={imageUrl} imageName="out-0.png" prompt={prompt} />
      </Modal>
    </>
  );
}
