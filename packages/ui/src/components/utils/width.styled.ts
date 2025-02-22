import { css } from 'styled-components';

import { generateCss } from './generateCss';

import { MediaQuery } from '../../types';
import { getHeightWidth } from '../../utils/getHeightWidth';

type WidthType = 'full' | 'screen' | 'inherit';
type IImageType = number | string | WidthType;

export interface WidthProps {
  width?: MediaQuery<IImageType>;
}
export interface ImageWidthProps {
  width?: IImageType;
}

const widthMap: Record<WidthType, string> = {
  full: '100%',
  screen: '100vw',
  inherit: 'inherit',
};

const getWidth = (item: WidthType | number | string) =>
  getHeightWidth(item, widthMap);

export const width = css<WidthProps>`
  ${props => props.width && generateCss(['width'], getWidth, props.width)}
`;
