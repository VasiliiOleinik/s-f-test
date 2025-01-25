import { ID } from '@/types';
import {
  EarthquakesSchemaType,
  EarthquakeSchemaType,
} from '../EarthquakeForm/helpers';
import { Control, FieldErrors } from 'react-hook-form';

export type EarthquakeListBodyProps = {
  fields: EarthquakeSchemaType[];
  activeFieldId: string;
  control: Control<EarthquakesSchemaType>;
  errors: FieldErrors<EarthquakesSchemaType>;
  handleUpdate: () => void;
  handleDelete: (id: ID) => void;
  setActiveFieldId: (id: ID) => void;
};
