import * as React from 'react';
import {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

interface IIconSendMessageProps {
  fill: string;
}

const IconSendMessage: FC<IIconSendMessageProps> = ({fill, ...props}) => {
  return (
    <Svg width={22} height={22} fill="none" {...props}>
      <Path
        fill={fill}
        d="M14.733 21.24a.708.708 0 0 1-.602-.336l-3.607-5.837a.709.709 0 0 1-.093-.504l.877-4.632-4.631.878a.706.706 0 0 1-.504-.094L.336 7.11a.708.708 0 0 1 .173-1.282L20.333.029a.707.707 0 0 1 .878.878L15.413 20.73a.707.707 0 0 1-.68.51Zm-2.86-6.683 2.627 4.25 4.99-17.056L2.432 6.74l4.25 2.626 5.383-1.019a.707.707 0 0 1 .827.828l-1.02 5.382Z"
      />
      <Path
        fill={fill}
        d="M1.228 20.721a.708.708 0 0 1-.5-1.209l6.793-6.794a.708.708 0 1 1 1.001 1.001l-6.794 6.795a.706.706 0 0 1-.5.207ZM6.134 21.167a.708.708 0 0 1-.5-1.208L8.19 17.4a.708.708 0 1 1 1.001 1.001L6.634 20.96a.706.706 0 0 1-.5.207ZM.78 15.815a.708.708 0 0 1-.5-1.208l2.557-2.558a.708.708 0 0 1 1.001 1.001l-2.557 2.558a.706.706 0 0 1-.5.207Z"
      />
    </Svg>
  );
};

export default IconSendMessage;
