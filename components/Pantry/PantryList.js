import { useState } from "react";
import styled from "styled-components";
import Card from "@/components/Card/Card";
import {
  deletePantryItem,
  updatePantryItem,
} from "@/services/pantryServices";

export default function PantryList({ pantry }) {
  const [editingId, setEditingId] = useState(null);
  const [editAmount, setEditAmount] = useState("");

  function startEdit(item) {
    setEditingId(item.ingredient._id);
    setEditAmount(item.amount);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditAmount("");
  }

  async function handleSaveEdit(ingredientId) {
    if (!editAmount || Number(editAmount) <= 0) return;
    const success = await updatePantryItem(ingredientId, {
      amount: Number(editAmount),
    });
    if (success) cancelEdit();
  }

  async function handleDelete(ingredientId) {
    await deletePantryItem(ingredientId);
    if (editingId === ingredientId) cancelEdit();
  }

  return (
    <Card>
      <Card.Title>Your pantry</Card.Title>
      {pantry.length === 0 ? (
        <EmptyText>
          Your pantry is empty. Add ingredients above to get started.
        </EmptyText>
      ) : (
        <List>
          {pantry.map((item) => {
            const ingredientId = item.ingredient._id;
            const isEditing = editingId === ingredientId;
            return (
              <Row key={ingredientId}>
                <Name>{item.ingredient.name}</Name>
                {isEditing ? (
                  <>
                    <EditAmountInput
                      type="number"
                      min="0"
                      step="any"
                      value={editAmount}
                      onChange={(event) => setEditAmount(event.target.value)}
                    />
                    <UnitLabel>{item.unit.name}</UnitLabel>
                    <RowActions>
                      <SaveBtn
                        type="button"
                        onClick={() => handleSaveEdit(ingredientId)}
                      >
                        Save
                      </SaveBtn>
                      <CancelBtn type="button" onClick={cancelEdit}>
                        Cancel
                      </CancelBtn>
                    </RowActions>
                  </>
                ) : (
                  <>
                    <Amount>
                      {item.amount} {item.unit.name}
                    </Amount>
                    <RowActions>
                      <EditBtn type="button" onClick={() => startEdit(item)}>
                        Edit
                      </EditBtn>
                      <RemoveBtn
                        type="button"
                        onClick={() => handleDelete(ingredientId)}
                        aria-label={`Remove ${item.ingredient.name}`}
                      >
                        ×
                      </RemoveBtn>
                    </RowActions>
                  </>
                )}
              </Row>
            );
          })}
        </List>
      )}
    </Card>
  );
}

const EmptyText = styled.p`
  color: var(--color-text-muted);
  margin: 0;
  font-size: 14px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: none;
  }
`;

const Name = styled.span`
  flex: 1;
  font-size: 15px;
  color: var(--color-text);
`;

const Amount = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: var(--color-brand);
`;

const UnitLabel = styled.span`
  font-size: 14px;
  color: var(--color-text-muted);
`;

const EditAmountInput = styled.input`
  width: 80px;
  padding: 6px 10px;
  background: var(--color-surface);
  border-radius: 6px;
  border: 1px solid var(--color-border);
  font-size: 14px;
  color: var(--color-text);
  outline: none;

  &:focus {
    border-color: var(--color-brand);
  }
`;

const RowActions = styled.div`
  display: flex;
  gap: 8px;
`;

const EditBtn = styled.button`
  background: none;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 13px;
  color: var(--color-text);
  cursor: pointer;
`;

const SaveBtn = styled.button`
  background: var(--color-brand);
  color: var(--color-surface-alt);
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;

const CancelBtn = styled.button`
  background: none;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 13px;
  color: var(--color-text);
  cursor: pointer;
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: var(--color-danger);
  cursor: pointer;
  font-size: 22px;
  line-height: 1;
  padding: 0 4px;
`;
