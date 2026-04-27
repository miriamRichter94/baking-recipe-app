import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";

// ─── Styled Components ───────────────────────────────────────────────────────

export const OpenButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(61, 43, 31, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
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

// ─── Blueprint Component ──────────────────────────────────────────────────────
//
// A wrapper that shows an icon button; clicking opens a centred modal overlay.
// The content inside the modal is passed as children.
//
// Props:
//   children   – content to render inside the modal (e.g. <DeleteConfirmation />)
//   triggerIcon – path to the icon shown as the open button (default: trash icon)
//   ariaLabel   – accessibility label for the open button
//
// Usage:
//   <ModalBox ariaLabel="delete recipe" triggerIcon="/assets/garbage.png">
//     <DeleteConfirmation recipeId={id} onCancel={…} />
//   </ModalBox>

export default function ModalBox({ children, triggerIcon = "/assets/garbage.png", ariaLabel = "open modal" }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <OpenButton aria-label={ariaLabel} onClick={() => setIsOpen(true)}>
        <Image src={triggerIcon} width={25} height={25} alt={ariaLabel} />
      </OpenButton>

      {isOpen && (
        <Overlay onClick={() => setIsOpen(false)}>
          {/* stopPropagation so clicking inside the modal does not close it */}
          <Modal onClick={(e) => e.stopPropagation()}>
            {children}
          </Modal>
        </Overlay>
      )}
    </>
  );
}
