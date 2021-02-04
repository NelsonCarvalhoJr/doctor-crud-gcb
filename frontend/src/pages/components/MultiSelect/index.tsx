import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';

import { useField } from '@unform/core';

import { InputContainer, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLSelectElement> {
  name: string;
  containerStyle?: object;
}

const MultiSelect: React.FC<InputProps> = ({
  name,
  containerStyle = {},
  ...rest
}) => {
  const inputRef = useRef<HTMLSelectElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => setIsFocused(true), []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

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
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />

      {error && <Error>{error}</Error>}
    </InputContainer>
  );
};

export default MultiSelect;
