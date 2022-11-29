import React, { useCallback, useState } from "react";
import { Button, Form, Header, Input, Label, LinkContainer, Error, Success } from "@pages/SignUp/styles";
import { Link, Navigate } from "react-router-dom";
import useInput from "@hooks/useInput";
import axios from "axios";
import useSWR from "swr";
import fetcher from "@utils/fetcher";

const SignUp = () => {
  const { data, error, mutate } = useSWR("/api/users", fetcher);
  const [email, , onChangeEmail] = useInput("");
  const [nickname, , onChangeNickName] = useInput("");
  const [password, setPassWord] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [missMatchError, setMissMatchError] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const onChangePassword = useCallback(
    (e: any) => {
      setPassWord(e.target.value);
      setMissMatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck],
  );

  const onChangePasswordCheck = useCallback(
    (e: any) => {
      setPasswordCheck(e.target.value);
      setMissMatchError(e.target.value !== password);
    },
    [password],
  );

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();

      if (!missMatchError && nickname) {
        console.log(`서버로 회원가입`);
        setSignUpError("");
        setSignUpSuccess(false);

        axios
          .post("/api/users", {
            email,
            nickname,
            password,
          })
          .then((response) => {
            console.log(response);
            setSignUpSuccess(true);
          })
          .catch((error) => {
            console.log(error.response);
            setSignUpError(error.response.data);
          });
      }
    },
    [email, nickname, password, passwordCheck],
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
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickName} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
            {missMatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
            {!nickname && <Error>닉네임을 입력해주세요</Error>}
            {signUpError && <Error>{signUpError}</Error>}
            {signUpSuccess && <Success>회원가입에 성공했습니다.</Success>}
          </div>
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
