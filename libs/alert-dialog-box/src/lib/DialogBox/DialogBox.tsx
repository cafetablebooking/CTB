import React from 'react';

import Dialog from '@material-ui/core/Dialog';

import { useFirestore } from '@ctb/use-firestore';
import AlertDialogForm from './AlertDialogForm';
import FieldDialogForm from './FieldDialogForm';
import { useAuthContext } from '@ctb/auth-context';
export interface ConfirmDialogProps {
  handleClose: () => void;
  open: boolean;
  setActivateCompanies: () => void;
  deleteHandler: () => void;
  selectedCompanies: any;
  actionType: string;
  resourceType: string;
  addTableResource?: (value: any) => void;
}

export function DialogBox(props: ConfirmDialogProps) {
  const {
    handleClose,
    open,
    setActivateCompanies,
    deleteHandler,
    selectedCompanies,
    actionType,
    resourceType,
    addTableResource,
  } = props;
  const { docs } = useFirestore('tableBookings');
  const { uidValue } = useAuthContext();
  const companyTables =
    docs &&
    docs.find((item) => {
      return item.id === uidValue;
    });

  const company =
    selectedCompanies &&
    selectedCompanies.data.map((item) => {
      const pendingCompany = companyTables.resources[item.index];

      if (!pendingCompany) return;
      const { resourceTitle } = pendingCompany;

      return <p>{resourceTitle}</p>;
    });

  const textFields = [
    { name: 'tableName', label: 'Table name', type: 'number' },
    { name: 'seats', label: 'Number of seats', type: 'number' },
  ];

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
          submitFunction={deleteHandler}
          handleClose={handleClose}
          company={company}
          title="Confirm Deletion"
          text={`Do you really want to delete the following ${resourceType}?`}
        />
      )}
      {actionType && actionType === 'createTable' && (
        <FieldDialogForm
          textFields={textFields}
          submitFunction={addTableResource}
          handleClose={handleClose}
        />
      )}
    </Dialog>
  );
}

export default DialogBox;
