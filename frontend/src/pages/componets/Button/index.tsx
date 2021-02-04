import React, { ButtonHTMLAttributes } from 'react';

import { ButtonContainer } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <ButtonContainer type="button" {...rest}>
    {loading ? 'Carregando...' : children}
  </ButtonContainer>
);

export default Button;
