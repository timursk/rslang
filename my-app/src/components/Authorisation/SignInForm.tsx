import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { APP_ROUTES } from '../../utils/Constants';
import { loginUser } from '../../services/UserService';
import { CustomError, NewUser } from '../../types/types';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../store/hooks';
import Loading from '../shared/Loading';
import { styled } from '@mui/material';

export default function SignInForm() {
  const [, dispatch] = useUserContext();
  const [userError, setUserError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  function emailValidation(inputEmail: string) {
    const regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (regExp.test(inputEmail)) {
      setEmailError('');
    } else {
      setEmailError('Введите корректный адрес почты');
    }
  }

  const emailHandler = (event: React.SyntheticEvent) => {
    const inputEmail = (event.target as HTMLInputElement).value;
    setEmail(inputEmail);
    emailValidation(inputEmail);
  };

  function passValidation(inputPass: string) {
    if (inputPass && inputPass.length > 7) {
      setPasswordError('');
    } else {
      setPasswordError('Пароль должен содержать минимум 8 символов');
    }
  }

  const passHandler = (event: React.SyntheticEvent) => {
    const inputPass = (event.target as HTMLInputElement).value;
    setPassword(inputPass);
    passValidation(inputPass);
  };

  const handleGuestLogin = async (e: React.MouseEvent) => {
    e.preventDefault();

    const currentUser: NewUser = {
      email: 'guest@mail.ru',
      password: 'guest1234',
    };

    updateUser(currentUser);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const data = new FormData(event.currentTarget);

    const currentUser: NewUser = {
      email: data.get('email') as string,
      password: data.get('password') as string,
    };

    updateUser(currentUser);
  };

  const updateUser = async (currentUser: NewUser) => {
    try {
      const dataUser = await loginUser(currentUser);
      const { message, userId, token, refreshToken, name } = dataUser;
      const newUser = { message, userId, token, refreshToken, name };

      localStorage.setItem('CurrentUser', JSON.stringify(newUser));
      dispatch({ type: 'UPDATE_USER', payload: newUser });

      setUserError('');
      setIsLoading(false);
      navigate(APP_ROUTES.MAIN);
    } catch (e) {
      setIsLoading(false);
      setUserError((e as CustomError).message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <StyledBox
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Авторизация
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            error={!!emailError}
            helperText={emailError}
            onChange={emailHandler}
            value={email}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Эл.почта"
            name="email"
            autoComplete="email"
            autoFocus
          />

          <TextField
            error={!!passwordError}
            helperText={passwordError}
            onChange={passHandler}
            value={password}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 1 }}
            disabled={!!passwordError || !!emailError}
            color="secondary"
          >
            Войти
          </Button>

          <Button
            fullWidth
            variant="contained"
            sx={{ mb: 2, border: '1px solid' }}
            color="primary"
            onClick={handleGuestLogin}
          >
            Гостевой вход
          </Button>

          <Grid container>
            <Grid item sx={{ fontFamily: 'Roboto' }}>
              <span>Впервые на сайте? </span>
              <Link to={APP_ROUTES.REGFORM}>
                <StyledSpan>Создать аккаунт</StyledSpan>
              </Link>
            </Grid>
          </Grid>

          {userError ? <ErrorBox>{userError}</ErrorBox> : null}
        </Box>
      </StyledBox>
    </Container>
  );
}

const StyledSpan = styled('span')`
  color: blue;
`;

const StyledBox = styled(Box)`
  padding: 20px;
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgb(0 0 0 / 14%);
  background-color: #ffffff9c;
  cursor: pointer;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  margin-top: 20px;
`;

const ErrorBox = styled('div')`
  margin-top: 15px;
  background-color: #eca48c;
  color: rgba(0, 0, 0, 0.582);
  font-size: 1.3em;
  border-radius: 10px;
  border: 2px solid #ec5a2a;
  text-align: center;
`;
