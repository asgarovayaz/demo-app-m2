import { createMask } from '@ngneat/input-mask';

export const dateInputMask = createMask<string>({
  alias: 'datetime',
  inputFormat: 'dd-mm-yyyy',
  parser: (value: string) => {
    const values = value.split('-');
    const year = values[2];
    const month = values[1];
    const date = values[0];
    return `${year}-${month}-${date}`;
  },
});

export const yearMonthInputMask = createMask({
  alias: 'datetime',
  inputFormat: 'mm-yyyy',
  parser: (value: string) => {
    const values = value.split('-');
    const year = values[1];
    const month = values[0];
    return `${year}-${month}`;
  },
});

export const timeInputMask = createMask({
  alias: 'datetime',
  inputFormat: 'HH:MM',
  parser: (value: string) => {
    const values = value.split(':');
    const hour = values[0];
    const min = values[1];
    return `${hour}:${min}`;
  },
});
export const emailInputMask = createMask({ alias: 'email' });
export const phoneInputMask = createMask('(999) 999-99-99');

export const yearInputMask = createMask({
  placeholder: '0000',
  mask: '9999',
});

export const currencyInputMask = createMask({
  alias: 'numeric',
  groupSeparator: ',',
  digits: 2,
  digitsOptional: false,
  suffix: ' ₼',
  placeholder: '0',
});
