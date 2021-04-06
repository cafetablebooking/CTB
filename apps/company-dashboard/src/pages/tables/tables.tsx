import React, { useState } from 'react';
import MUIDataTable from 'mui-datatables';

import Layout from '../../components/layout/layout';

import { useFirestore } from '@ctb/use-firestore';
import CustomToolBar from './CustomToolBar';
import { firestore, firebase } from '@ctb/firebase-auth';
import { useAuthContext } from '@ctb/auth-context';
import { DialogBox } from '@ctb/alert-dialog-box';
import CustomToolbarSelect from './CustomToolBarSelect';
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
    name: 'seats',
    label: 'Seats',
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
  const [resourceType, setResourceType] = useState<string>('');
  const { docs } = useFirestore('tableBookings');
  const { uidValue } = useAuthContext();
  const companyTables =
    docs &&
    docs.find((item) => {
      return item.id === uidValue;
    });

  const tableResources = companyTables && companyTables.resources;

  const handleAction = (selectedRows, type) => {
    if (type === 'delete') {
      setSelectedCompanies(selectedRows);
      setActionType('delete');
      setResourceType('tables');
      setOpen(true);
    }
  };
  const handleToolbarAction = () => {
    setOpen(true);
    setActionType('createTable');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setDeleteTables = async (selectedRows) => {
    selectedRows.data.map(async (item) => {
      const tableResource = companyTables.resources[item.index];
      const resourceArr = [];
      resourceArr.push(...companyTables.resources);

      let index = resourceArr.findIndex(
        (item) => item.resourceId === tableResource.resourceId
      );

      let resources;
      if (index > -1) {
        resources = [...resourceArr];
        resources.splice(index, 1);
      }

      const tableBookings = firestore.collection('tableBookings').doc(uidValue);
      await tableBookings.set({
        resources: resources,
      });

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
    customToolbar: (selectedRows) => (
      <CustomToolBar
        handleAction={handleToolbarAction}
        selectedRows={selectedRows}
      />
    ),
    customToolbarSelect: (selectedRows) => (
      <CustomToolbarSelect
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
        resourceType={resourceType}
      />
      <MUIDataTable
        title={'Table list'}
        data={tableResources}
        columns={columns}
        options={options}
      />
    </Layout>
  );
}

export default Tables;
