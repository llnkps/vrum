

import CustomBottomSheetModal, {
  BottomSheetRef,
} from "@/components/global/CustomBottomSheetModal";
import { CustomRectButton } from "@/components/ui/button";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";

type DocumentsOkOption = (typeof options)[number];

type DocumentsOkModalProps = {
  onSelect: (value: DocumentsOkOption) => void;
};

const options = [
  { label: "Документы в порядке", value: true },
  { label: "Проблемы с документами", value: false },
];

const DocumentsOkModal = forwardRef<BottomSheetRef, DocumentsOkModalProps>(
  ({ onSelect }, ref) => {
    const [selected, setSelected] = React.useState<boolean | undefined>(undefined);

    return (
      <CustomBottomSheetModal
        ref={ref}
        snapPoints={["60%"]}
        enableContentPanningGesture={true}
      >
        <BottomSheetView className="flex-col">
          {options.map((opt) => (
            <CustomRectButton
              key={opt.label}
              onPress={() => {
                onSelect(opt);
                setSelected(opt.value);
              }}
              title={opt.label}
              isSelected={selected === opt.value}
            />
          ))}
        </BottomSheetView>
      </CustomBottomSheetModal>
    );
  }
);
DocumentsOkModal.displayName = "DocumentsOkModal";

export default DocumentsOkModal;
