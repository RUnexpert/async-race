import React from 'react';
import { PageType } from '../../types';
import Button from '@mui/material/Button';

interface Props {
  setPage: (page: PageType) => void;
}

export const Navigation: React.FC<Props> = ({ setPage }) => {
  return (
    <div>
      <Button onClick={() => setPage('garage')}>To garage</Button>
      <Button onClick={() => setPage('winners')}>To winners</Button>
    </div>
  );
};
