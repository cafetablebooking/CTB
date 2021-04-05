import React, { useState } from 'react';
import MUIDataTable from 'mui-datatables';

import Layout from '../../components/layout/layout';

import { useFirestore } from '@ctb/use-firestore';
import CustomToolBarSelect from './CustomToolBarSelect';
import { firestore } from '@ctb/firebase-auth';
import { useAuthContext } from '@ctb/auth-context';
import DialogBox from './DialogBox/DialogBox';
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

export function Tables(props: UsersProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState(null);
  const [actionType, setActionType] = useState<string>('');
  const handleClickOpen = (selectedRows) => {
    setSelectedCompanies(selectedRows);
    setOpen(true);
  };
  const handleAction = (selectedRows, type) => {
    handleClickOpen(selectedRows);
    type === 'delete' ? setActionType('delete') : setActionType('activate');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { docs } = useFirestore('company_requests');

  const { signup }: any = useAuthContext();

  const setDeleteTables = async (selectedRows) => {
    selectedRows.data.map(async (item) => {
      const company = docs[item.index];

      const { id } = company;
      if (!id) return;
      const tables = firestore.collection('tables').doc(id);
      await tables.delete();
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
        setDeleteCompanies={() => setDeleteTables(selectedCompanies)}
        selectedCompanies={selectedCompanies}
        actionType={actionType}
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

export default Tables;
