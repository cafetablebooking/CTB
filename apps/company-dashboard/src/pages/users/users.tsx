import React from 'react';
import MUIDataTable from 'mui-datatables';
import { functions } from '@ctb/firebase-auth';

import { fetchAuthUsers } from '../../hooks/useSWR';
import Layout from '../../components/layout/layout';
import { useAuthContext } from '@ctb/auth-context';

/* eslint-disable-next-line */
export interface UsersProps {}
// export interface option {}
const columns = [
  {
    name: 'displayName',
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

export function Users(props: UsersProps) {
  const { data, isLoading, isError } = fetchAuthUsers();
  const { user } = useAuthContext();
  // console.log(isAdmin);
  const options = {
    filter: true,
    filterType: 'dropdown',
    response: 'simple',
    tableBodyHeight: '500px',
    elevation: 1,
    sortFilterList: true,
    onRowsDelete: ({ data: rowData }) => {
      const uidToDelete = rowData.map((d) => data[d.dataIndex].uid);
      return functions
        .httpsCallable('isUserAdmin')({
          uid: user.uid,
        })
        .then((res) => {
          if (res.data) {
            console.log(res.data);
            functions.httpsCallable('deleteUser')({
              uid: uidToDelete[0],
            });
            return true;
          }
          return false;
        });
      //this function is not async och need to set up some other way roud
    },
  };
  return (
    <Layout>
      <MUIDataTable
        title={'User list'}
        data={data}
        columns={columns}
        options={options}
      />
    </Layout>
  );
}

export default Users;
