import React, { FC, PropsWithChildren, useCallback } from "react";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Workspace: FC<PropsWithChildren> = ({ children }) => {
  const { data, error, mutate } = useSWR("/api/users", fetcher, {
    dedupingInterval: 100000,
  });
  const onLogout = useCallback(() => {
    axios
      .post("/api/users/logout", null, {
        withCredentials: true,
      })
      .then(() => {
        mutate(false, false);
      });
  }, []);

  if (!data) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <button onClick={onLogout}>로그아웃</button>
      {children}
    </div>
  );
};

export default Workspace;
