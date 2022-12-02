import React, { CSSProperties, FC, useCallback } from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { CloseModalButton, CreateModal } from "@components/Modal/styles";

interface Props {
  children: ReactJSXElement[] | ReactJSXElement;
  show: boolean;
  onCloseModal: () => void;
  style?: CSSProperties;
}

const Modal: FC<Props> = ({ show, children, onCloseModal }) => {
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  if (!show) {
    return null;
  }

  return (
    <CreateModal onClick={onCloseModal}>
      <div onClick={stopPropagation}>
        <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
        {children}
      </div>
    </CreateModal>
  );
};

export default Modal;
