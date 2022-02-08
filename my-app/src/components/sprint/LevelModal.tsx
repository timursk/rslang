import { Box, Container } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import LevelButton from './LevelButton';

export interface ModalProps {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  setLevel: Dispatch<SetStateAction<number>>;
}


const LevelModal = (props: ModalProps) => {
  const LEVELS = [1, 2, 3, 4, 5, 6];
  return (
    <Container maxWidth="sm" style={{display: props.active ? 'block' : 'none'}}>
      <h2 style={{textAlign: 'center'}}>Выбери свой уровень</h2>
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'space-between', }}>
        {LEVELS.map((item) => <LevelButton item={item} props={props}/>)}
      </Container>
    </Container>
  );
};

export default LevelModal;
