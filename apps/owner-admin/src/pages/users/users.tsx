import React from 'react';
import MUIDataTable from 'mui-datatables';
import { fetchAuthUsers } from '../../hooks/useSWR';
import Layout from '../../components/layout/layout';

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
];

const options = {
  filter: true,
  filterType: 'dropdown',
  response: 'simple',
  tableBodyHeight: '500px',
  elevation: 1,
  sortFilterList: true,
  // tableBodyMaxHeight,
};
export function Users(props: UsersProps) {
  const { data, isLoading, isError } = fetchAuthUsers();
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
