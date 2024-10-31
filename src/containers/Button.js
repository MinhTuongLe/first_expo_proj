import React from 'react';
import {Button as ButtonRN} from '../components';

const Button = ({...rest}) => {
  return <ButtonRN {...rest} />;
};

export default Button;
