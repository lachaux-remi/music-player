import React, { useState } from "react";

import { MassActions } from "@/components/mass-actions/MassActions";
import { MassActionItemProps } from "@/components/mass-actions/mass-action-item/MassActionItem";

export const useMassSelection = <T extends object>(items: T[], massActionItems: MassActionItemProps[]) => {
  const [selectedItems, setSelectedItem] = useState<T[]>([]);

  const renderMassActions = selectedItems.length > 0 && (
    <MassActions<T>
      items={items}
      selectedItems={selectedItems}
      setSelectedItems={setSelectedItem}
      massActionItems={massActionItems}
    ></MassActions>
  );

  return {
    selectedItems,
    setSelectedItem,
    renderMassActions
  };
};
