import React from 'react';
import MUIDataTable from 'mui-datatables';
import styled from 'styled-components';
import Layout from '../../components/layout/layout';
import { useFirestore } from '@ctb/use-firestore';

/* eslint-disable-next-line */
export interface CompanyUserProps {}

const StyledCompanyUser = styled.div`
  color: pink;
`;
const columns = [
  {
    name: 'companyName',
    label: 'Company Name',
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
    name: 'phoneNumber',
    label: 'Phone Number',
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
};
export function CompanyUser(props: CompanyUserProps) {
  const { docs } = useFirestore('companies');
  console.log(docs);
  return (
    <Layout>
      <MUIDataTable
        title={'User list'}
        data={docs}
        columns={columns}
        options={options}
      />
    </Layout>
  );
}

export default CompanyUser;
