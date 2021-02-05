import React, { InputHTMLAttributes, useState, useCallback } from 'react';
import InputMask from 'react-input-mask';

import { InputContainer, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  mask?: string;
  error?: string;
  containerStyle?: object;
}

const Input: React.FC<InputProps> = ({
  name,
  mask,
  error,
  containerStyle = {},
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => setIsFocused(true), []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <>
      <InputContainer
        style={containerStyle}
        isErrored={!!error}
        isFocused={isFocused}
        data-testid="input-container"
      >
        <InputMask
          name={name}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          mask={mask || ''}
          {...rest}
        />
      </InputContainer>

      {error && <Error>{error}</Error>}
    </>
  );
};

export default Input;
