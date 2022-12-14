import React, { FC, useCallback } from "react";
import Modal from "@components/Modal";
import { Button, Input, Label } from "@pages/SignUp/styles";
import useInput from "@hooks/useInput";

interface Props {
  show: boolean;
  onCloseModal: () => void;
}

const CreateChannelModal: FC<Props> = ({ show, onCloseModal }) => {
  const [newChannel, setNewChannel, onChangeNewChannel] = useInput("");
  const onCreateChannel = useCallback(() => {}, []);

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onCreateChannel}>
        <Label id="channel-label">
          <span>워크스페이스 이름</span>
          <Input id="channel" value={newChannel} onChange={onChangeNewChannel} />
        </Label>
        <Button type="submit">생성하기</Button>
      </form>
    </Modal>
  );
};

export default CreateChannelModal;
