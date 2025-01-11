import { FocusEvent } from 'react';
import { Field, RadioGroup, Stack } from '@chakra-ui/react';
import {
  ariaDescribedByIds,
  enumOptionsIndexForValue,
  enumOptionsValueForIndex,
  labelValue,
  optionId,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';
// import { Radio } from '../snippets/radio';
import { getChakra } from '../utils';

export default function RadioWidget<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>({
  id,
  options,
  value,
  required,
  disabled,
  readonly,
  label,
  hideLabel,
  onChange,
  onBlur,
  onFocus,
  uiSchema,
}: WidgetProps<T, S, F>) {
  const { enumOptions, enumDisabled, emptyValue } = options;
  const chakraProps = getChakra({ uiSchema });

  const _onChange = (nextValue: any) => onChange(enumOptionsValueForIndex<S>(nextValue, enumOptions, emptyValue));
  const _onBlur = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onBlur(id, enumOptionsValueForIndex<S>(value, enumOptions, emptyValue));
  const _onFocus = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onFocus(id, enumOptionsValueForIndex<S>(value, enumOptions, emptyValue));

  const row = options ? options.inline : false;
  const selectedIndex = (enumOptionsIndexForValue<S>(value, enumOptions) as string) ?? null;

  return (
    <Field.Root mb={1} {...chakraProps} disabled={disabled || readonly} required={required} readOnly={readonly}>
      {labelValue(
        <Field.Label htmlFor={id} id={`${id}-label`}>
          {label}
        </Field.Label>,
        hideLabel || !label
      )}
      <RadioGroup.Root
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        value={selectedIndex}
        name={id}
        aria-describedby={ariaDescribedByIds<T>(id)}
      >
        <Stack direction={row ? 'row' : 'column'}>
          {Array.isArray(enumOptions) &&
            enumOptions.map((option, index) => {
              const itemDisabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(option.value) !== -1;

              return (
                <RadioGroup.Item
                  value={String(index)}
                  key={index}
                  id={optionId(id, index)}
                  disabled={disabled || itemDisabled || readonly}
                >
                  {option.label}
                </RadioGroup.Item>
              );
            })}
        </Stack>
      </RadioGroup.Root>
    </Field.Root>
  );
}
