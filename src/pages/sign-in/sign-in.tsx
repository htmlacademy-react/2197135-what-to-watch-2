import { Helmet } from 'react-helmet-async';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '@/hooks';
import { LoginData } from '@/types/login-data';
import { loginAction } from '@/store/api-actions';
import Header from '@/components/header/header';
import FooterLogo from '@/components/footer-logo/footer-logo';
import {toast} from 'react-toastify';

const loginErrorMessages = {
  LOGIN_IS_EMPTY: 'поля не могут быть пустые',
  LOGIN_IS_NOT_EMAIL: 'введен некорректный эмейл',
  LOGIN_IS_NOT_VALID_PASSWORD: 'пароль должен содержать и буквы и цифры',
};

const isNotEmpty = (value: string) => value.trim() !== '';
const isEmail = (value: string) => value.includes('@');
const isValidPassword = (value: string) => {
  const hasDigit = /\d/.test(value);
  const hasLetter = /[a-zA-Zа-яА-Я]/.test(value);
  return value.length > 0 && hasDigit && hasLetter;
};

export default function SignIn() {
  const [loginData, setLoginData] = useState({
    login: '',
    password: '',
  });

  const dispatch = useAppDispatch();

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setLoginData((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = (authData: LoginData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (
      isNotEmpty(loginData.login) &&
      isNotEmpty(loginData.password) &&
      isEmail(loginData.login) &&
      isValidPassword(loginData.password)
    ) {
      onSubmit(loginData);
    }

    if(!isNotEmpty(loginData.login) || !isNotEmpty(loginData.password)) {
      toast.warn(loginErrorMessages.LOGIN_IS_EMPTY);
    }

    if(!isEmail(loginData.login)) {
      toast.warn(loginErrorMessages.LOGIN_IS_NOT_EMAIL);
    }

    if(!isValidPassword(loginData.password)) {
      toast.warn(loginErrorMessages.LOGIN_IS_NOT_VALID_PASSWORD);
    }
  };

  return (
    <div className="user-page">
      <Helmet>
        <title>What to whatch.Log in</title>
      </Helmet>
      <Header />
      <div className="sign-in user-page__content">
        <form action="" className="sign-in__form" onSubmit={handleSubmit}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="login"
                id="login"
                value={loginData.login}
                onChange={handleInputChange}
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-email"
              >
                Email address
              </label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="password"
                id="password"
                value={loginData.password}
                onChange={handleInputChange}
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-password"
              >
                Password
              </label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>
      <footer className="page-footer">
        <FooterLogo />
        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}
