import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';

interface Props {
  selectedRows: Object;
  handleAction: (value: string) => void;
}

const CustomToolbarSelect = (props: Props) => {
  const { handleAction } = props;

  return (
    <div className={'custom-toolbar-select'}>
      <Tooltip title={'Create Table'}>
        <Button
          color="secondary"
          variant="contained"
          style={{ height: '36px', width: 245.2 }}
          onClick={() => handleAction('createTable')}
        >
          Create Table
        </Button>
      </Tooltip>
    </div>
  );
};

export default CustomToolbarSelect;
