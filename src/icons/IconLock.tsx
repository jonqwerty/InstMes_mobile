import * as React from 'react';
import {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

interface IIconLockProps {
  fill: string;
}

const IconLock: FC<IIconLockProps> = ({fill, ...props}) => {
  return (
    <Svg width={22} height={25} fill="none" {...props}>
      <Path
        fill={fill}
        d="M19.837 9.248h-1.27V8c0-3.708-2.359-7.5-6.067-7.5h-2C6.792.5 3.933 4.292 3.933 8v1.248h-1.27A2.163 2.163 0 0 0 .5 11.41v10.856c0 1.195 1.112 2.5 2.307 2.5h17.03c1.194 0 2.163-1.305 2.163-2.5V11.411a2.163 2.163 0 0 0-2.163-2.163Zm-13.24 0V8c0-2.747 2.156-5 4.903-5 2.394 0 4.403 2.606 4.403 5v1.248H6.596Z"
      />
    </Svg>
  );
};

export default IconLock;
