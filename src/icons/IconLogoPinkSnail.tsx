import * as React from 'react';
import {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

interface IIconLogoPinkSnailProps {
  stroke: string;
  fill: string;
}

const IconLogoPinkSnail: FC<IIconLogoPinkSnailProps> = ({
  stroke,
  fill,
  ...props
}) => {
  return (
    <Svg width={112} height={57} fill="none" {...props}>
      <Path
        fill={fill}
        d="m2.666 8.147 6.584 10.03c-.031.026-2.991 2.524-3.675 4.233-.539 1.346-.704 4.509-.704 4.509.704 6.073 1.776 7.852 17.7 10.92.919 3.234 3.4 13.864 11.637 16.594 8.238 2.73 54.572 2.578 76.07.615.955-1.742.786-2.885.49-3.222-6.639-5.251-11.464-7.505-13.046-7.975-1.164 1.319-1.653 1.77-3.124 2.945-3.031 2.055-7.625 3.343-11.177 3.803-7.779 1.008-12.22-3.497-14.18-6.135-2.42-3.257-2.663-5.367-2.878-7.3-.306-5.46-.214-5.767 1.654-9.417 1.47-2.208 1.623-3.251 5.42-5.183 1.899-.829 2.573-1.013 4.349-1.013 1.409 0 1.837 0 2.91.215.99.307 1.906.591 2.602 1.288 1.899 1.81.838 8.395-.214 10.337.613-1.319.95-7.594-1.47-8.65-1.03-.45-6.125-.46-8.911 1.749-2.971 2.454-4.135 7.055-3.828 9.386.264 2.01.474 2.392 1.163 4.049.612 1.472.674 1.779 1.715 3.098 1.501 1.901 4.93 4.662 9.861 5.092 0 0 2.113.092 3.644-.184 1.531-.276 3.614-1.166 3.614-1.166s.728-.282 1.194-.522c.466-.24.744-.436 1.194-.705.829-.494 1.96-1.503 1.96-1.503 2.052-1.932 6.085-6.533 7.289-13.006.764-4.11.741-15.244-10.994-23.833-4.205-2.679-16.396-6.43-31.512 0C54.757 9.21 47.101 13.024 45.54 26.49c-.066.575 0 9.6 4.195 13.312-1.776-.583-7.778-6.657-7.778-6.657L29.002 19.844c-2.143-1.416-4.121-4.335-12.066-4.335L7.363 3.362C8.24 1.582 6.72 1 5.955 1c-.858 0-2.047.613-1.789 1.994.062.327.503 1.35 1.789 1.227l7.337 11.778c-.357.051-1.268.276-1.806.767L4.075 7.288c.306-1.534-.735-2.147-1.501-2.147-.858 0-1.684.828-1.562 1.81.061.327.368 1.319 1.654 1.196Z"
      />
      <Path
        stroke={stroke}
        d="M9.25 18.177 2.666 8.147c-1.286.123-1.593-.87-1.654-1.196-.122-.982.704-1.81 1.562-1.81.766 0 1.807.613 1.5 2.147l7.412 9.478c.538-.49 1.449-.715 1.806-.767L5.955 4.221a1.598 1.598 0 0 1-1.789-1.227C3.908 1.614 5.097 1 5.955 1c.765 0 2.284.583 1.408 2.362l9.573 12.147c7.945 0 9.923 2.919 12.066 4.335l12.954 13.301s6.002 6.074 7.778 6.657c-4.195-3.711-4.261-12.737-4.195-13.312 1.562-13.466 9.218-17.28 12.464-19.294 15.116-6.43 27.307-2.679 31.512 0 11.735 8.589 11.758 19.723 10.994 23.833-1.204 6.473-5.237 11.074-7.288 13.006 0 0-1.132 1.009-1.96 1.503-.451.269-.729.466-1.195.706-.466.24-1.194.52-1.194.52s-2.083.89-3.614 1.166c-1.531.277-3.644.185-3.644.185-4.93-.43-8.36-3.19-9.861-5.092-1.041-1.32-1.103-1.626-1.715-3.098-.689-1.657-.899-2.04-1.163-4.05-.307-2.33.857-6.931 3.828-9.385 2.786-2.209 7.88-2.198 8.911-1.749 2.42 1.056 2.083 7.331 1.47 8.65 1.052-1.942 2.113-8.527.214-10.337-.696-.697-1.612-.981-2.603-1.288-1.072-.215-1.5-.215-2.91-.215-1.775 0-2.449.184-4.348 1.013-3.797 1.932-3.95 2.975-5.42 5.183-1.868 3.65-1.96 3.957-1.654 9.417.215 1.933.459 4.043 2.879 7.3 1.96 2.638 6.4 7.143 14.179 6.135 3.552-.46 8.145-1.748 11.177-3.803 1.471-1.174 1.96-1.626 3.124-2.945 1.582.47 6.407 2.724 13.046 7.975.296.337.465 1.48-.49 3.222-21.498 1.963-67.832 2.115-76.07-.615-8.237-2.73-10.718-13.36-11.637-16.595-15.924-3.067-16.996-4.846-17.7-10.92 0 0 .165-3.162.704-4.508.687-1.718 3.675-4.233 3.675-4.233"
      />
    </Svg>
  );
};

export default IconLogoPinkSnail;