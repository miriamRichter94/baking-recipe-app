import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";
import styled, { css } from "styled-components";
import { useState } from "react";
import RecalculateBakingform from "../RecalculateBakingform/RecalculateBakingform";
import { StyledBtn } from "../Button/StyledButton";

export default function ModalBox({
  type,
  transparent = false,
  children,
  ...restValues
}) {
  const [showModalBox, setShowModalBox] = useState(false);
  return (
    <>
      <OpenButton
        $transparent={transparent}
        aria-label="delete recipe"
        onClick={() => setShowModalBox(true)}
      >
        {children}
      </OpenButton>

      {showModalBox && (
        <Overlay
          $transparent={transparent}
          onClick={() => setShowModalBox(false)}
        >
          <Modal onClick={(e) => e.stopPropagation()}>
            <CancelBtn onClick={() => setShowModalBox(false)}>❌</CancelBtn>
            {type === "delete" && (
              <DeleteConfirmation
                onCancel={() => setShowModalBox(false)}
                {...restValues}
              />
            )}

            {type === "recalculate" && (
              <RecalculateBakingform {...restValues} />
            )}
          </Modal>
        </Overlay>
      )}
    </>
  );
}

const OpenButton = styled(StyledBtn)`
  ${({ $transparent }) =>
    $transparent &&
    css`
      background-color: transparent;
      font-weight: bold;
      color: white;
      border: none;
      padding: 0;
      cursor: pointer;
    `}
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(61, 43, 31, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: #ffffff;
  padding: 28px 24px;
  width: 380px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 16px;
  position: relative;
  z-index: 10000;
  box-shadow: 0 8px 32px rgba(60, 40, 20, 0.18);
`;

const CancelBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;
