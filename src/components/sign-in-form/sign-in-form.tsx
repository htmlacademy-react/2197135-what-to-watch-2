import { toast } from 'react-toastify';
import { loginAction } from '@/store/api-actions';
import { LoginData } from '@/types/login-data';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { ChangeEvent, FormEvent, useState } from 'react';
import cn from 'classnames';
import { getLoginStatusSelector } from '@/store/user-slice/user-slice-selectors';
import Spinner from '../spinner/spinner';

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

export default function SignInForm() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>(
    {}
  );

  const dispatch = useAppDispatch();

  const loginStatus = useAppSelector(getLoginStatusSelector);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setLoginData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validationRules = {
    notEmpty: (value: LoginData) =>
      isNotEmpty(value.email) && isNotEmpty(value.password),
    validEmail: (value: LoginData) => isEmail(value.email),
    validPassword: (value: LoginData) => isValidPassword(value.password),
  };

  type ValidationRulesKeys = keyof typeof validationRules;

  const isValid = Object.keys(validationRules).every((rule) =>
    validationRules[rule as ValidationRulesKeys](loginData)
  );

  const showErrorMessage = () => {
    const errors: { [key: string]: string } = {};
    if (!isNotEmpty(loginData.email) || !isNotEmpty(loginData.password)) {
      toast.warn(loginErrorMessages.LOGIN_IS_EMPTY);
      errors['email'] = loginErrorMessages.LOGIN_IS_EMPTY;
    }

    if (!isEmail(loginData.email)) {
      toast.warn(loginErrorMessages.LOGIN_IS_NOT_EMAIL);
      errors['email'] = loginErrorMessages.LOGIN_IS_NOT_EMAIL;
    }

    if (!isValidPassword(loginData.password)) {
      toast.warn(loginErrorMessages.LOGIN_IS_NOT_VALID_PASSWORD);
      errors['password'] = loginErrorMessages.LOGIN_IS_NOT_VALID_PASSWORD;
    }

    setErrorMessages(errors);
  };

  const onSubmit = (authData: LoginData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!isValid) {
      showErrorMessage();
      return;
    }
    setErrorMessages({});
    onSubmit(loginData);
  };

  return (
    <div className="sign-in user-page__content">
      <form action="" className="sign-in__form" onSubmit={handleSubmit}>
        <div className="sign-in__message">
          {!isValid &&
            Object.values(errorMessages).map((errorMessage) => (
              <div className="sign-in__message" key={errorMessage}>
                <p>{errorMessage}</p>
              </div>
            ))}
        </div>
        <div className="sign-in__fields">
          {Object.entries(loginData).map(([key, value]) => (
            <div
              key={key}
              className={cn('sign-in__field', {
                'sign-in__field--error': errorMessages[key],
              })}
            >
              <input
                className="sign-in__input"
                type={key}
                placeholder={key === 'email' ? 'Email address' : 'Password'}
                name={key}
                id={key}
                value={value}
                onChange={handleInputChange}
              />
              <label className="sign-in__label visually-hidden" htmlFor={key}>
                {key}
              </label>
            </div>
          ))}
        </div>
        <div className="sign-in__submit">
          <button className="sign-in__btn" type="submit">
            {loginStatus.isLoading ? <Spinner /> : 'Sign in'}
          </button>
        </div>
      </form>
    </div>
  );
}
