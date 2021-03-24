import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";

import { useForm } from "../utils/hooks";

const Login = (props) => {
  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(loginCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginCallback() {
    loginUser();
  }
  return (
    <div>
      <form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <input
          label="Username"
          placeholder="Username..."
          name="username"
          value={values.username}
          onChange={onChange}
          type="text"
        />
        <input
          label="Password"
          placeholder="Password..."
          name="password"
          value={values.password}
          onChange={onChange}
          type="password"
        />

        <button>Login</button>
      </form>
      {Object.keys(errors).length > 0 && (
        <ul>
          {Object.values(errors).map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Login;

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
