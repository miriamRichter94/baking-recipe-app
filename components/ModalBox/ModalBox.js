import { useState } from "react";
import Image from "next/image";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";
import { OpenButton, Overlay, Modal } from "@/styles/components/ModalBox.styled";

export default function ModalBox({ type, recipeId }) {
  const [showModalBox, setShowModalBox] = useState(false);

  return (
    <>
      <OpenButton aria-label="delete recipe" onClick={() => setShowModalBox(true)}>
        <Image src="/assets/garbage.png" width={25} height={25} alt="Trash Can" />
      </OpenButton>

      {showModalBox && (
        <Overlay onClick={() => setShowModalBox(false)}>
          {/* stopPropagation so clicking inside the modal does not close it */}
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
