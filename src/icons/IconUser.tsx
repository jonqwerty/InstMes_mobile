import * as React from 'react';
import {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

interface IIconUserProps {
  fill: string;
}

const IconUser: FC<IIconUserProps> = ({fill, ...props}) => {
  return (
    <Svg width={22} height={24} fill="none" {...props}>
      <Path
        fill={fill}
        d="M21.518 24c0-5.942-4.817-10.76-10.759-10.76S0 18.059 0 24h21.518ZM10.76 11.42a5.71 5.71 0 1 0 0-11.42 5.71 5.71 0 0 0 0 11.42Z"
      />
    </Svg>
  );
};

export default IconUser;
