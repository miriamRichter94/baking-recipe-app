import styled from "styled-components";

// ─── Styled Components ───────────────────────────────────────────────────────

export const TabTrack = styled.div`
  display: flex;
  background: #e8ddd2;
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 20px;
`;

export const Tab = styled.div`
  flex: 1;
  padding: 10px 0;
  text-align: center;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  background: ${({ $active }) => ($active ? "#ffffff" : "transparent")};
  color: ${({ $active }) => ($active ? "#3d2b1f" : "#8c7b6b")};
  box-shadow: ${({ $active }) => ($active ? "0 1px 4px rgba(0,0,0,0.06)" : "none")};
`;

// ─── Blueprint Component ──────────────────────────────────────────────────────
//
// Used on the recipe detail page (mobile) to switch between Ingredients / Steps.
//
// Props:
//   tabs      – array of tab label strings, e.g. ["Ingredients", "Steps"]
//   active    – the currently selected tab label
//   onChange  – (tabLabel) => void — called when user taps a tab
//
// Usage:
//   const [activeTab, setActiveTab] = useState("Ingredients");
//   <TabSwitcher
//     tabs={["Ingredients", "Steps"]}
//     active={activeTab}
//     onChange={setActiveTab}
//   />

export default function TabSwitcher({ tabs, active, onChange }) {
  return (
    <TabTrack>
      {tabs.map((tab) => (
        <Tab key={tab} $active={active === tab} onClick={() => onChange(tab)}>
          {tab}
        </Tab>
      ))}
    </TabTrack>
  );
}
