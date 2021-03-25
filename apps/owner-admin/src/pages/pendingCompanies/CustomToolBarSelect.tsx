import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';

interface Props {
  selectedRows: Object;
  setActivateCompanies: (value: Object) => void;
}

const CustomToolbarSelect = (props: Props) => {
  const { selectedRows, setActivateCompanies } = props;

  return (
    <div className={'custom-toolbar-select'}>
      <Tooltip title={'Activate Company'}>
        <Button
          color="secondary"
          variant="contained"
          style={{ height: '36px', width: 245.2 }}
          onClick={() => setActivateCompanies(selectedRows)}
        >
          Activate Company
        </Button>
      </Tooltip>
      <Tooltip title={'Delete'}>
        <IconButton onClick={() => console.log('')}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default CustomToolbarSelect;
