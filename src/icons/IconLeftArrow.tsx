import * as React from 'react';
import {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

interface IIconLeftArrowProps {
  fill: string;
}

const IconLeftArrow: FC<IIconLeftArrowProps> = ({fill, ...props}) => {
  return (
    <Svg width={22} height={10} fill="none" {...props}>
      <Path
        fill={fill}
        d="M.013 4.671 8.083 0v3.19h13.385c.017 0 .032.014.032.032V6.16a.033.033 0 0 1-.032.033H8.083v3.19L.013 4.712a.023.023 0 0 1 0-.041Z"
      />
    </Svg>
  );
};

export default IconLeftArrow;
