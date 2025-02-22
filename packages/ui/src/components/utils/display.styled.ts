import { css } from 'styled-components';

import { generateCss } from './generateCss';

import { MediaQuery } from '../../types';

type DisplayType = 'none' | 'inline' | 'block' | 'inline-block' | 'flex';
type $OverflowType = 'scroll' | 'hidden';

export interface DisplayProps {
  display?: MediaQuery<DisplayType>;
  $overflowX?: MediaQuery<$OverflowType>;
  $overflowY?: MediaQuery<$OverflowType>;
  $overflow?: MediaQuery<$OverflowType>;
}

export const display = css<DisplayProps>`
  ${props =>
    props.display &&
    generateCss(['display'], (item: string) => `${item}`, props.display)}

  ${props =>
    props.$overflowX &&
    generateCss(['overflow-x'], (item: string) => `${item}`, props.$overflowX)}

  ${props =>
    props.$overflowY &&
    generateCss(['overflow-y'], (item: string) => `${item}`, props.$overflowY)}

  ${props =>
    props.$overflow &&
    generateCss(['overflow-x'], (item: string) => `${item}`, props.$overflow) +
      generateCss(['overflow-y'], (item: string) => `${item}`, props.$overflow)}
`;
