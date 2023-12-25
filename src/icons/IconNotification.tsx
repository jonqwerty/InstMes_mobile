import * as React from 'react';
import {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

interface IIconNotificationProps {
  fill: string;
}

const IconNotification: FC<IIconNotificationProps> = ({fill, ...props}) => {
  return (
    <Svg width={22} height={20} fill="none" {...props}>
      <Path
        fill={fill}
        d="M3.577 19.653a.355.355 0 0 1-.355-.355v-4.012H1.237A1.238 1.238 0 0 1 0 14.049V1.237C0 .555.555 0 1.237 0h19.026c.682 0 1.237.555 1.237 1.237v12.812c0 .682-.555 1.237-1.237 1.237H8.171L3.825 19.55a.354.354 0 0 1-.248.102Z"
      />
    </Svg>
  );
};

export default IconNotification;
