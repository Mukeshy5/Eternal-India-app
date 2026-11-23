import { Controller } from 'react-hook-form';

import DatePickerField from './DatePickerField';
import { InputField } from './ui';

export function FormInput({ control, name, ...props }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <InputField
          {...props}
          ref={field.ref}
          value={field.value ?? ''}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}

export function FormDatePicker({ control, name, label }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
          <DatePickerField
            label={label}
            value={field.value ?? ''}
            onChange={(date) => {
              field.onChange(date);
              field.onBlur();
            }}
            error={fieldState.error?.message}
          />
      )}
    />
  );
}
