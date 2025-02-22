import React, { FC } from 'react';
import styled from 'styled-components';

import { Typography } from '../../atoms';

interface NameBoxProps {
  text: string;
}

const NameBoxStyle = styled.div<NameBoxProps>`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: center;

  @media ${({ theme }) => theme.screens.lg} {
    padding: 16px 0 16px 40px;
  }
`;

export const TableNameBox: FC<NameBoxProps> = ({ ...props }) => (
  <NameBoxStyle {...props}>
    <Typography variant="p" color="muted">
      {props.text}
    </Typography>
  </NameBoxStyle>
);
