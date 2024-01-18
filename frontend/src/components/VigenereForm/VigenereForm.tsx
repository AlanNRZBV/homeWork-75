'use client';
import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import {IBtnType, IMessage} from '@/types';
import { LoadingButton } from '@mui/lab';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

const VigenereForm = () => {
  const [state, setState] = useState<IMessage>({
    password: '',
    encoded: '',
    decoded: '',
  });

  const [btnType,setBtnType]=useState<IBtnType>({
    type:''
  })

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(btnType.type === 'encode'){
      console.log('to encode')
      console.log(state)
    }else if(btnType.type === 'decode'){
      console.log('to decode')
      console.log(state)
    }
  }

  const checkBtn =(e:React.MouseEvent<HTMLButtonElement>)=>{
    const name = (e.target as HTMLButtonElement).name
    setBtnType(prevState => ({
      ...prevState,
      type:name
    }))
  }

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
              label="Decode message"
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
              label="Encode message"
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default VigenereForm;
