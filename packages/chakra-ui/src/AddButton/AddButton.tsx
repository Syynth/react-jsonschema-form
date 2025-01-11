import { FormContextType, IconButtonProps, RJSFSchema, StrictRJSFSchema, TranslatableString } from '@rjsf/utils';
import { Button } from '@chakra-ui/react';
import { LuPlus } from 'react-icons/lu';

export default function AddButton<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>({
  uiSchema,
  registry,
  ...props
}: IconButtonProps<T, S, F>) {
  const { translateString } = registry;
  return (
    <Button {...props}>
      <LuPlus />
      {translateString(TranslatableString.AddItemButton)}
    </Button>
  );
}
