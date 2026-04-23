import Image from "next/image";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";
import styled from "styled-components";
import { useState } from "react";

export default function ModalBox({ type, recipeId }) {
  const [showModalBox, setShowModalBox] = useState(false);

  return (
    <>
      <OpenButton
        aria-label="delete recipe"
        onClick={() => setShowModalBox(true)}
      >
        <Image
          src="/assets/garbage.png"
          width={25}
          height={25}
          alt="Trash Can"
        ></Image>
      </OpenButton>

      {showModalBox && (
        <Overlay onClick={() => setShowModalBox(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            {type === "delete" && (
              <DeleteConfirmation
                onCancel={() => setShowModalBox(false)}
                recipeId={recipeId}
              />
            )}
          </Modal>
        </Overlay>
      )}
    </>
  );
}

const OpenButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  width: 100%;
  align-self: center;
  cursor: pointer;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: white;
  padding: 20px;
  width: 400px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 8px;
  position: relative;
  z-index: 10000;
`;
