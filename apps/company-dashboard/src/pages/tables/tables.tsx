import React, { useState } from 'react';
import MUIDataTable from 'mui-datatables';

import Layout from '../../components/layout/layout';

import { useFirestore } from '@ctb/use-firestore';
import CustomToolBar from './CustomToolBar';
import { firestore, firebase } from '@ctb/firebase-auth';
import { useAuthContext } from '@ctb/auth-context';
import { DialogBox } from '@ctb/alert-dialog-box';
import CustomToolbarSelect from './CustomToolBarSelect';
import { v4 as uuidv4 } from 'uuid';
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

  const addTableResource = async (data) => {
    const { seats, tableName } = data;

    const tableBookings = firestore.collection('tableBookings').doc(uidValue);
    if (companyTables) {
      tableBookings.update({
        resources: firebase.firestore.FieldValue.arrayUnion({
          seats,
          resourceTitle: tableName,
          resourceId: uuidv4(),
        }),
      });
    } else {
      await tableBookings.set({
        resources: [
          {
            seats,
            resourceTitle: tableName,
            resourceId: uuidv4(),
          },
        ],
      });
    }
  };
  const deleteTableResource = async (selectedRows) => {
    const resourceIdsToDelete = selectedRows.data.reduce((acc, curr) => {
      const toDelete = companyTables.resources[curr.dataIndex]?.resourceId;
      if (!acc[toDelete]) acc[toDelete] = toDelete;
      return acc;
    }, {});

    console.log(resourceIdsToDelete);

    const afterdeleteTables = companyTables.resources.filter((item) => {
      return item?.resourceId !== resourceIdsToDelete[item?.resourceId];
    });
    console.log(afterdeleteTables);

    const tableBookings = firestore.collection('tableBookings').doc(uidValue);
    tableBookings.set({
      resources: afterdeleteTables,
    });

    handleClose();
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
        deleteHandler={() => deleteTableResource(selectedCompanies)}
        selectedCompanies={selectedCompanies}
        actionType={actionType}
        resourceType={resourceType}
        addTableResource={addTableResource}
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
