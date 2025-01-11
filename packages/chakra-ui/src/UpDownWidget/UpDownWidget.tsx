import { FocusEvent } from 'react';
import { NumberInput, Field } from '@chakra-ui/react';
import {
  ariaDescribedByIds,
  labelValue,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';
import { getChakra } from '../utils';

export default function UpDownWidget<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>(
  props: WidgetProps<T, S, F>
) {
  const { id, uiSchema, readonly, disabled, label, hideLabel, value, onChange, onBlur, onFocus, rawErrors, required } =
    props;

  const chakraProps = getChakra({ uiSchema });

  const _onChange = (value: string | number) => onChange(value);
  const _onBlur = ({ target }: FocusEvent<HTMLInputElement | any>) => onBlur(id, target && target.value);
  const _onFocus = ({ target }: FocusEvent<HTMLInputElement | any>) => onFocus(id, target && target.value);

  return (
    <Field.Root
      mb={1}
      {...chakraProps}
      disabled={disabled || readonly}
      required={required}
      readOnly={readonly}
      invalid={rawErrors && rawErrors.length > 0}
    >
      {labelValue(<Field.Label htmlFor={id}>{label}</Field.Label>, hideLabel || !label)}
      <NumberInput.Root
        value={value ?? ''}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        aria-describedby={ariaDescribedByIds<T>(id)}
      >
        <NumberInput.Input id={id} name={id} />
        <NumberInput.Control>
          <NumberInput.IncrementTrigger />
          <NumberInput.DecrementTrigger />
        </NumberInput.Control>
      </NumberInput.Root>
    </Field.Root>
  );
}
