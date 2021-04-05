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
    name: 'resourceId',
    label: 'Id',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'resourceTitle',
    label: 'Name',
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

  const { docs } = useFirestore('tableBookings');

  const table =
    docs &&
    docs.find((item) => {
      return item.companyId === '3c672850-82bf-11eb-8ed2-9d3621fb18a8';
    });
  const resources = table && table.resources;

  const { signup }: any = useAuthContext();

  const setDeleteTables = async (selectedRows) => {
    selectedRows.data.map(async (item) => {
      const company = docs[item.index];

      const { id } = company;
      if (!id) return;
      const tables = firestore.collection('tableBookings').doc(id);
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
        title={'Table list'}
        data={resources}
        columns={columns}
        options={options}
      />
    </Layout>
  );
}

export default Tables;
