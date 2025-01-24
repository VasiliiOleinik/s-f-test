import React from 'react';
import { INPUT_TYPES } from '@/constants';
import { Box } from '@radix-ui/themes';

const Input = ({
  type = INPUT_TYPES.text,
  placeholder = '',
  readOnly = false,
  sx = {},
  error = '',
  ...rest
}) => {
  return (
    <Box>
      <input
        {...rest}
        type={type}
        placeholder={placeholder}
        readOnly={readOnly}
        style={{
          width: 228,
          height: 32,
          boxSizing: 'border-box',
          border: 'none',
          borderRadius: 5,
          padding: '5px 15px',
          outline: 'none',
          boxShadow: readOnly ? 'none' : 'inset 0 0 0 1px #cdced7',
          ...sx,
        }}
      />
      {!!error && <Box style={{ color: 'red', fontSize: 12 }}>{error}</Box>}
    </Box>
  );
};

export default Input;
