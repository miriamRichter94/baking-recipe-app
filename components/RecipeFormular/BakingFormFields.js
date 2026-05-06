import styled from "styled-components";
import InputField from "./InputField";
import { useState } from "react";

export default function BakingFormFields({
  shape = "round",
  diameter = "",
  width = "",
  length = "",
  readOnly = false,
  onShapeChange, // only needed when editable
}) {
  const [selectedShape, setSelectedShape] = useState(shape ?? "round");

  return (
    <>
      <ShapeToggleRow>
        {["round", "rect"].map((s) => (
          <ShapeToggleBtn
            key={s}
            type="button"
            $active={selectedShape === s}
            onClick={() => setSelectedShape(s)}
            disabled={readOnly}
          >
            {s === "rect" ? "Rectangular" : "Round"}
          </ShapeToggleBtn>
        ))}
      </ShapeToggleRow>
      <input
        type="hidden"
        name={readOnly ? "shapeOnlyRead" : "shape"}
        value={selectedShape}
      />
      {selectedShape === "round" ? (
        <InputField
          label="Diameter (cm)"
          type="number"
          placeholder="24"
          name={readOnly ? "diameterOnlyRead" : "diameter"}
          id={readOnly ? "diameterOnlyRead" : "diameter"}
          defaultValue={diameter}
          readOnly={readOnly}
        />
      ) : (
        <div style={{ display: "flex", gap: 12 }}>
          <InputField
            label="Width (cm)"
            type="number"
            placeholder="30"
            name={readOnly ? "widthOnlyRead" : "width"}
            id={readOnly ? "widthOnlyRead" : "width"}
            defaultValue={width}
            readOnly={readOnly}
          />
          <InputField
            label="length (cm)"
            type="number"
            placeholder="40"
            name={readOnly ? "lengthOnlyRead" : "length"}
            id={readOnly ? "lengthOnlyRead" : "length"}
            defaultValue={length}
            readOnly={readOnly}
          />
        </div>
      )}
    </>
  );
}

const ShapeToggleRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 14px;
`;

const ShapeToggleBtn = styled.button`
  flex: 1;
  padding: 10px 0;
  text-align: center;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-transform: capitalize;

  background: ${({ $active }) =>
    $active ? "var(--color-brand)" : "transparent"};
  color: ${({ $active }) =>
    $active ? "var(--color-surface-alt)" : "var(--color-text-muted)"};
  border: ${({ $active }) =>
    $active ? "none" : "1px solid var(--color-border)"};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
