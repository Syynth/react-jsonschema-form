import { FocusEvent, FormEvent } from 'react';
import { CheckboxGroup, Field, Text, Stack } from '@chakra-ui/react';
import {
  ariaDescribedByIds,
  enumOptionsIndexForValue,
  enumOptionsIsSelected,
  enumOptionsValueForIndex,
  labelValue,
  optionId,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';
import { Checkbox } from '../snippets/checkbox';
import { getChakra } from '../utils';

export default function CheckboxesWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: WidgetProps<T, S, F>) {
  const {
    id,
    disabled,
    options,
    value,
    readonly,
    onChange,
    onBlur,
    onFocus,
    required,
    label,
    hideLabel,
    uiSchema,
    rawErrors = [],
  } = props;
  const { enumOptions, enumDisabled, emptyValue } = options;
  const chakraProps = getChakra({ uiSchema });
  const checkboxesValues = Array.isArray(value) ? value : [value];

  const _onBlur = ({ target }: FocusEvent<HTMLInputElement | any>) =>
    onBlur(id, enumOptionsValueForIndex<S>(target && target.value, enumOptions, emptyValue));
  const _onFocus = ({ target }: FocusEvent<HTMLInputElement | any>) =>
    onFocus(id, enumOptionsValueForIndex<S>(target && target.value, enumOptions, emptyValue));

  const row = options ? options.inline : false;
  const selectedIndexes = enumOptionsIndexForValue<S>(value, enumOptions, true) as string[];

  return (
    <Field.Root
      mb={1}
      {...chakraProps}
      disabled={disabled || readonly}
      required={required}
      readOnly={readonly}
      invalid={rawErrors && rawErrors.length > 0}
    >
      {labelValue(
        <Field.Label htmlFor={id} id={`${id}-label`}>
          {label}
        </Field.Label>,
        hideLabel || !label
      )}
      <CheckboxGroup
        onChange={(option: FormEvent<HTMLInputElement>) =>
          // @ts-expect-error TODO: Fix type error
          onChange(enumOptionsValueForIndex<S>(option.target.value, enumOptions, emptyValue))
        }
        defaultValue={selectedIndexes}
        aria-describedby={ariaDescribedByIds<T>(id)}
      >
        <Stack direction={row ? 'row' : 'column'}>
          {Array.isArray(enumOptions) &&
            enumOptions.map((option, index) => {
              const checked = enumOptionsIsSelected<S>(option.value, checkboxesValues);
              const itemDisabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(option.value) !== -1;
              return (
                <Checkbox
                  key={index}
                  id={optionId(id, index)}
                  name={id}
                  value={String(index)}
                  isChecked={checked}
                  isDisabled={disabled || itemDisabled || readonly}
                  onBlur={_onBlur}
                  onFocus={_onFocus}
                >
                  {option.label && <Text>{option.label}</Text>}
                </Checkbox>
              );
            })}
        </Stack>
      </CheckboxGroup>
    </Field.Root>
  );
}
