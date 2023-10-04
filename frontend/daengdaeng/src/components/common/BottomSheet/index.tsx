import React from 'react';

import Sheet from 'react-modal-sheet';

import styles from './index.module.scss';

type BottomSheetProps = {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BottomSheet = ({ children, isOpen, setIsOpen }: BottomSheetProps) => {
  return (
    <Sheet
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      className={styles.sheet}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>{children}</Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

export default BottomSheet;
