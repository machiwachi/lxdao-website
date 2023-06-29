/* eslint-disable no-undef */
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box } from '@mui/material';
import LXButton from '@/components/Button';
import TextInput from './TextInput';

function ReasonForm(props) {
  const { saveReasonHandler } = props;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      reason: '',
    },
  });

  const onSubmit = (data) => {
    if (saveReasonHandler) {
      saveReasonHandler(data);
    }
  };

  function SubmitButton() {
    if (JSON.stringify(errors) !== '{}') {
      return (
        <LXButton
          variant="gradient"
          disabled={true}
        >
          Submit
        </LXButton>
      );
    }

    // todo add more steps and tips, like uploading to IPFS etc.
    if (props.updating) {
      return (
        <LXButton variant="gradient" disabled={true}>
          Submit...
        </LXButton>
      );
    }

    return (
      <LXButton variant="gradient" onClick={handleSubmit(onSubmit)}>
        Submit
      </LXButton>
    );
  }

  return (
    <Box>
      <Box style={props.innerContainerStyle || {}}>
        <Box marginBlock={2.5}>
          <Controller
            name={'reason'}
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => {
              return (
                <TextInput
                  required
                  multiline
                  rows={3}
                  placeholder="Reason"
                  fullWidth
                  label="Reason"
                  onChange={onChange}
                  value={value}
                  error={!!errors.description}
                  helperText={errors.description ? 'Reason is required' : ''}
                />
              );
            }}
          />
        </Box>

        {JSON.stringify(errors) !== '{}' && (
          <Box marginTop={2}>
            <Alert severity="error">
              Please fill in the required fields above.
            </Alert>
          </Box>
        )}
        {!props.isOnboardingProcess && (
          <Box marginTop={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <SubmitButton />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ReasonForm;
