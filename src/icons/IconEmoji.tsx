import * as React from 'react';
import {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

interface IIconEmojiProps {
  fill: string;
}

const IconEmoji: FC<IIconEmojiProps> = ({fill, ...props}) => {
  return (
    <Svg width={22} height={22} fill="none" {...props}>
      <Path
        fill={fill}
        d="M10.75 21.5C4.822 21.5 0 16.677 0 10.75 0 4.822 4.822 0 10.75 0 16.677 0 21.5 4.822 21.5 10.75c0 5.927-4.823 10.75-10.75 10.75Zm0-20.544C5.35.956.956 5.349.956 10.75c0 5.4 4.393 9.794 9.794 9.794 5.4 0 9.794-4.393 9.794-9.794 0-5.4-4.393-9.794-9.794-9.794Z"
      />
      <Path
        fill={fill}
        d="M7.405 9.687a1.194 1.194 0 1 0 0-2.39 1.194 1.194 0 0 0 0 2.39ZM14.095 9.687a1.194 1.194 0 1 0 0-2.39 1.194 1.194 0 0 0 0 2.39ZM10.75 16.566c-1.9 0-3.665-.948-4.72-2.537a.478.478 0 1 1 .797-.528 4.7 4.7 0 0 0 7.845 0 .477.477 0 1 1 .795.528 5.654 5.654 0 0 1-4.718 2.537Z"
      />
    </Svg>
  );
};

export default IconEmoji;
