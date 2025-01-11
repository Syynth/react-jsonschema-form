import { FocusEvent } from 'react';
import { Field, Slider, SliderThumb, SliderTrack } from '@chakra-ui/react';
import {
  ariaDescribedByIds,
  FormContextType,
  labelValue,
  rangeSpec,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';
import { getChakra } from '../utils';

export default function RangeWidget<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>({
  value,
  readonly,
  disabled,
  onBlur,
  onFocus,
  options,
  schema,
  uiSchema,
  onChange,
  label,
  hideLabel,
  id,
}: WidgetProps<T, S, F>) {
  const chakraProps = getChakra({ uiSchema });

  const sliderWidgetProps = { value, label, id, ...rangeSpec<S>(schema) };

  const _onChange = (value: undefined | number) => onChange(value === undefined ? options.emptyValue : value);
  const _onBlur = ({ target }: FocusEvent<HTMLInputElement>) => onBlur(id, target && target.value);
  const _onFocus = ({ target }: FocusEvent<HTMLInputElement>) => onFocus(id, target && target.value);

  return (
    <Field.Root mb={1} {...chakraProps}>
      {labelValue(<Field.Label htmlFor={id}>{label}</Field.Label>, hideLabel || !label)}
      <Slider.Root
        {...sliderWidgetProps}
        id={id}
        name={id}
        isDisabled={disabled || readonly}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        aria-describedby={ariaDescribedByIds<T>(id)}
      >
        <SliderTrack>
          <Slider.Track />
        </SliderTrack>
        <SliderThumb />
      </Slider.Root>
    </Field.Root>
  );
}
