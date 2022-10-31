import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    if (isLogin) {
    } else {
      setIsSignUp(true);
      const res = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCclsjtBcrJCT0ARxC17b2-9U6rTpTkuLY',
        {
          method: 'POST',
          body: JSON.stringify({
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if(res.ok) {

      } else {
        const data = await res.json();
        alert(data.error.message);
      }
      setIsSignUp(false);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isSignUp ? <button>{isLogin ? 'Login' : 'Create Account'}</button> : <h2 style={{color:'white'}}>Sending Request...</h2>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
