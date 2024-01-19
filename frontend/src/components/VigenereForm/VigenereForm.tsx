'use client';
import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { IBtnType, IMessage, IMessageMutation } from '@/types';
import { LoadingButton } from '@mui/lab';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';
import { axiosApi } from '@/axiosApi';

const VigenereForm = () => {
  const [state, setState] = useState<IMessage>({
    password: '',
    decoded: '',
    encoded: '',
  });

  const [btnType, setBtnType] = useState<IBtnType>({
    type: '',
  });

  const mutation = useMutation({
    mutationFn: async () => {
      if (btnType.type === 'encode') {
        if (state.decoded.trim() !== '') {
          const message: IMessageMutation = {
            password: state.password,
            message: state.decoded,
          };

          const response = await axiosApi.post('/encode', message);

          if (response.data !== undefined) {
            setState((prevState) => ({
              ...prevState,
              decoded: '',
              encoded: response.data.encoded,
            }));
          }
        } else {
          alert('Encoding message must not be empty');
        }
      } else {
        if (state.encoded.trim() !== '') {
          const message: IMessageMutation = {
            password: state.password,
            message: state.encoded,
          };
          const response = await axiosApi.post('/decode', message);
          if (response.data !== undefined) {
            setState((prevState) => ({
              ...prevState,
              encoded: '',
              decoded: response.data.decoded,
            }));
          }
        } else {
          alert('Decoding message must not be empty');
        }
      }
    },
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutation.mutateAsync();
  };

  const checkBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = (e.target as HTMLButtonElement).name;
    setBtnType((prevState) => ({
      ...prevState,
      type: name,
    }));
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid container direction="column">
          <Grid item xs sx={{ mb: 2 }}>
            <TextField
              multiline
              rows={3}
              name="decoded"
              id="decoded"
              value={state.decoded}
              onChange={onInputChange}
              label="Decoded message"
            />
          </Grid>
          <Grid container item xs sx={{ mb: 2 }} alignItems="center">
            <Grid item sx={{ mr: 4 }}>
              <TextField
                required
                name="password"
                id="password"
                label="Password"
                value={state.password}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item>
              <LoadingButton
                onClick={checkBtn}
                type="submit"
                color="primary"
                variant="contained"
                name="decode"
                loading={mutation.isPending}
                disabled={mutation.isPending}
                startIcon={<ArrowUpward />}
                sx={{ mr: 2 }}
              >
                Decode
              </LoadingButton>
              <LoadingButton
                onClick={checkBtn}
                type="submit"
                color="primary"
                name="encode"
                variant="contained"
                loading={mutation.isPending}
                disabled={mutation.isPending}
                startIcon={<ArrowDownward />}
              >
                Encode
              </LoadingButton>
            </Grid>
          </Grid>
          <Grid item xs sx={{ mb: 2 }}>
            <TextField
              multiline
              rows={3}
              name="encoded"
              id="encoded"
              value={state.encoded}
              onChange={onInputChange}
              label="Encoded message"
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default VigenereForm;
