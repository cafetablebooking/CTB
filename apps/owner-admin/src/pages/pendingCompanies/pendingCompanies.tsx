import React, { useState } from 'react';
import MUIDataTable from 'mui-datatables';

import Layout from '../../components/layout/layout';

import { useFirestore } from '@ctb/use-firestore';
import CustomToolBarSelect from './CustomToolBarSelect';
import { firestore } from '@ctb/firebase-auth';
import { useAuthContext } from '@ctb/auth-context';
import { DialogBox } from '@ctb/alert-dialog-box';
/* eslint-disable-next-line */
export interface UsersProps {}
// export interface option {}
const columns = [
  {
    name: 'companyName',
    label: 'Name',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'email',
    label: 'Email',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'uid',
    label: 'uid',
    options: {
      filter: true,
      sort: true,
      display: false,
    },
  },
];

export function PendingCompanies(props: UsersProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState(null);
  const [actionType, setActionType] = useState<string>('');
  const [resourceType, setResourceType] = useState<string>('');
  const handleClickOpen = (selectedRows) => {
    setSelectedCompanies(selectedRows);
    setOpen(true);
  };
  const handleAction = (selectedRows, type) => {
    handleClickOpen(selectedRows);
    if (type === 'delete') {
      setActionType('delete');
      setResourceType('companies');
    } else {
      setActionType('activate');
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { docs } = useFirestore('company_requests');

  const { signup }: any = useAuthContext();

  const setDeleteCompanies = async (selectedRows) => {
    selectedRows.data.map(async (item) => {
      const company = docs[item.index];

      const { id } = company;
      if (!id) return;
      const pendingCompanies = firestore.collection('company_requests').doc(id);
      await pendingCompanies.delete();
      handleClose();
    });
  };
  const setActivateCompanies = (selectedRows) => {
    selectedRows.data.map(async (item) => {
      const pendingCompany = docs[item.index];
      const {
        companyName,
        vatNr,
        email,
        phoneNumber,
        id,
        coordinates,
      } = pendingCompany;

      const pendingCompanies = firestore.collection('company_requests').doc(id);

      const res = await signup(email, id, companyName);

      if (res) {
        const companiesRef = firestore.collection('companies').doc(res.uid);

        await companiesRef.set({
          id,
          companyName,
          vatNr,
          email,
          phoneNumber,
          coordinates,
        });
        await pendingCompanies.delete();
      }
      handleClose();
    });
  };

  const options = {
    filter: true,
    filterType: 'dropdown',
    response: 'simple',
    tableBodyHeight: '500px',
    elevation: 1,
    sortFilterList: true,
    customToolbarSelect: (selectedRows) => (
      <CustomToolBarSelect
        handleAction={handleAction}
        selectedRows={selectedRows}
      />
    ),
  };
  return (
    <Layout>
      <DialogBox
        open={open}
        handleClose={handleClose}
        setActivateCompanies={() => setActivateCompanies(selectedCompanies)}
        deleteHandler={() => setDeleteCompanies(selectedCompanies)}
        selectedCompanies={selectedCompanies}
        actionType={actionType}
        resourceType={resourceType}
      />
      <MUIDataTable
        title={'Pending Companies list'}
        data={docs}
        columns={columns}
        options={options}
      />
    </Layout>
  );
}

export default PendingCompanies;
