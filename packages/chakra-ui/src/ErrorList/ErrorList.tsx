import { ErrorListProps, FormContextType, RJSFSchema, StrictRJSFSchema, TranslatableString } from '@rjsf/utils';
import { List, Alert } from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';

export default function ErrorList<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>({
  errors,
  registry,
}: ErrorListProps<T, S, F>) {
  const { translateString } = registry;
  return (
    <Alert.Root flexDirection='column' alignItems='flex-start' gap={3} status='error'>
      <Alert.Title>{translateString(TranslatableString.ErrorsLabel)}</Alert.Title>
      <List.Root>
        {errors.map((error, i) => (
          <List.Item key={i}>
            <List.Indicator as={WarningIcon} color='red.500' />
            {error.stack}
          </List.Item>
        ))}
      </List.Root>
    </Alert.Root>
  );
}
