import { useState } from "react";
import Input from "./Input";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation";
import { useInput } from "../hooks/useInput";

export default function StateLogin() {
  const {
    value: emailValue,
    handleInputBlur: handleEmailBlur,
    handleInputChange: handleEmailChange,
    hasError: EmailHasError,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));
  const {
    value: passwordValue,
    handleInputBlur: handlePasswordBlur,
    handleInputChange: handlePasswordChange,
    hasError: PasswordHasError,
  } = useInput("", (value) => hasMinLength(value, 6));

  function handleSubmit(e) {
    e.preventDefault();

    console.log(enteredValues);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
          value={emailValue}
          error={EmailHasError && "Please Check Email"}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onBlur={handlePasswordBlur}
          onChange={handlePasswordChange}
          value={passwordValue}
          error={PasswordHasError && "Please Check Password"}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
