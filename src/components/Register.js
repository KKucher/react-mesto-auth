import React from "react";
import { Link } from "react-router-dom";

function Register({ handleRegister }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChange(evt) {
    if (evt.target.name === "Email") {
      setEmail(evt.target.value);
    } else if (evt.target.name === "Password") {
      setPassword(evt.target.value);
    }
  }

  function resetForm() {
    setEmail("");
    setPassword("");
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!email) {
      console.log("Не введен email");
      return;
    }
    if (!password) {
      console.log("Не введен пароль");
      return;
    }
    handleRegister(email, password);
    resetForm();
  }
  return (
    <section className="sign">
      <h2 className="sign__title">Регистрация</h2>
      <form
        className="sign__form"
        action="#"
        name="sign-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          required
          type="email"
          className="sign__input"
          placeholder="Email"
          name="Email"
          onChange={handleChange}
          value={email}
        ></input>
        <input
          required
          type="password"
          className="sign__input"
          placeholder="Пароль"
          name="Password"
          onChange={handleChange}
          value={password}
        ></input>
        <button type="submit" className="sign__button">
          Зарегистрироваться
        </button>
      </form>
      <p className="sign__text">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="sign__link">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
