import React, { useState } from 'react';
import Axios from 'axios';
import { useStateValue } from '../context/State.Context';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import useFormState from '../hooks/useFormState';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

// Statics
import './Auth.css';

const Login: React.FC = () => {
  const history = useHistory();
  // Context
  const [, dispatch] = useStateValue();
  const [showPassword, setShowPassword] = useState(false);
  const [password, handlePassword, resetPss] = useFormState('');
  const [username, handleUsername, resetUrsName] = useFormState('');

  // Functions
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    if (username && password) {
      e.preventDefault();
      const { data } = await Axios.post('/auth/login', { username, password });
      if (!data.error) {
        dispatch({ type: 'SET_USER', user: data });
        resetPss();
        resetUrsName();
        history.push('/');
      } else {
        alert(data.error);
      }
    } else {
      alert('Please Fill out the fields');
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <h3>Login to Shopify</h3>
        <TextField
          label="UserName"
          value={username}
          onChange={handleUsername}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePassword}
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button type="submit" color="primary" variant="contained" fullWidth>
          Login!
        </Button>
      </form>
    </div>
  );
};

export default Login;