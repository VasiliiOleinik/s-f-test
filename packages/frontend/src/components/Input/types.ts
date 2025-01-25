import { INPUT_TYPES } from '@/constants';

export type InputProps = {
  type?: `${INPUT_TYPES}`;
  placeholder?: string;
  readOnly?: boolean;
  sx?: Record<string, any>;
  error?: string;
  value: string;
  [key: string]: any;
};
