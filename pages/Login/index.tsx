import React, { useCallback, useState } from "react";
import { Button, Form, Input, Label, LinkContainer, Error, Header } from "@pages/SignUp/styles";
import { Link } from "react-router-dom";
import useInput from "@hooks/useInput";
import axios from "axios";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { Navigate } from "react-router";

const Login = () => {
  const { data, error, mutate } = useSWR("/api/users", fetcher);
  const [email, , onChangeEmail] = useInput("");
  const [password, , onChangePassword] = useInput("");
  const [logInError, setLogInError] = useState(false);
  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();

      if (email && password) {
        setLogInError(false);

        axios
          .post("/api/users/login", {
            email,
            password,
          })
          .then((response) => {
            mutate(response.data, false);
          })
          .catch((error) => {
            setLogInError(true);
          });
      }
    },
    [email, password],
  );

  if (data) {
    return <Navigate to="/workspace/channel" />;
  }

  return (
    <div id="container">
      <Header>Slack Clone</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword}></Input>
          </div>
          {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default Login;
