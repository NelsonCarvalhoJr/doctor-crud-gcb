import React, { InputHTMLAttributes, useState, useCallback } from 'react';

import { InputContainer, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLSelectElement> {
  name: string;
  error?: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  containerStyle?: object;
}

const MultiSelect: React.FC<InputProps> = ({
  name,
  error,
  options,
  containerStyle = {},
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => setIsFocused(true), []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <InputContainer
      style={containerStyle}
      isErrored={!!error}
      isFocused={isFocused}
      data-testid="input-container"
    >
      <select
        name={name}
        multiple
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      >
        <option value={0}>Selecione...</option>

        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <Error>{error}</Error>}
    </InputContainer>
  );
};

export default MultiSelect;
