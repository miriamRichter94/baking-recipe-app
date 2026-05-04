import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";
import styled from "styled-components";
import { useState } from "react";
import RecalculateBakingform from "../RecalculateBakingform/RecalculateBakingform";

export default function ModalBox({ type, children, ...restValues }) {
  const [showModalBox, setShowModalBox] = useState(false);

  return (
    <>
      <OpenButton
        aria-label="delete recipe"
        onClick={() => setShowModalBox(true)}
      >
        {children}
      </OpenButton>

      {showModalBox && (
        <Overlay onClick={() => setShowModalBox(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
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

const OpenButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  padding: 0;
  cursor: pointer;
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
