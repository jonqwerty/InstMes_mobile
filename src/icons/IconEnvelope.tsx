import * as React from 'react';
import {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

interface IIconEnvelopeProps {
  fill: string;
}

const IconEnvelope: FC<IIconEnvelopeProps> = ({fill, ...props}) => {
  return (
    <Svg width={22} height={15} fill="none" {...props}>
      <Path
        fill={fill}
        d="M10.75 8.876 21.5 2.224V.69a.69.69 0 0 0-.69-.69H.69A.69.69 0 0 0 0 .69v1.534l10.75 6.652Z"
      />
      <Path
        fill={fill}
        d="m10.938 9.602-.007.003a.351.351 0 0 1-.06.027c-.01.003-.02.008-.029.01a.358.358 0 0 1-.084.012l-.008.001h-.008a.372.372 0 0 1-.084-.012l-.028-.011a.358.358 0 0 1-.06-.027l-.008-.003L0 3.066v10.82c0 .38.309.69.69.69h20.12a.69.69 0 0 0 .69-.69V3.065L10.938 9.602Z"
      />
    </Svg>
  );
};

export default IconEnvelope;
