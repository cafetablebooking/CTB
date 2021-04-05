import React from 'react';

import Dialog from '@material-ui/core/Dialog';

import { useFirestore } from '@ctb/use-firestore';
import AlertDialogForm from './AlertDialogForm';
export interface ConfirmDialogProps {
  handleClose: () => void;
  open: boolean;
  setActivateCompanies: () => void;
  setDeleteCompanies: () => void;
  selectedCompanies: any;
  actionType: string;
}

export function DialogBox(props: ConfirmDialogProps) {
  const {
    handleClose,
    open,
    setActivateCompanies,
    setDeleteCompanies,
    selectedCompanies,
    actionType,
  } = props;
  const { docs } = useFirestore('company_requests');
  const company =
    selectedCompanies &&
    selectedCompanies.data.map((item) => {
      const pendingCompany = docs[item.index];
      if (!pendingCompany) return;
      const { companyName } = pendingCompany;

      return <p>{companyName}</p>;
    });
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      {actionType && actionType === 'activate' && (
        <AlertDialogForm
          submitFunction={setActivateCompanies}
          handleClose={handleClose}
          company={company}
          title="Confirm Activation"
          text="Do you really want to activate the following companies?"
        />
      )}
      {actionType && actionType === 'delete' && (
        <AlertDialogForm
          submitFunction={setDeleteCompanies}
          handleClose={handleClose}
          company={company}
          title="Confirm Deletion"
          text="Do you really want to delete the following companies?"
        />
      )}
    </Dialog>
  );
}

export default DialogBox;
