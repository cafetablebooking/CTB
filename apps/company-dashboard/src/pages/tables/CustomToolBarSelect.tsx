import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';

interface Props {
  selectedRows: Object;
  handleAction: (value: Object, type: string) => void;
}

const CustomToolbarSelect = (props: Props) => {
  const { selectedRows, handleAction } = props;

  return (
    <div className={'custom-toolbar-select'}>
      <Tooltip title={'Activate Company'}>
        <Button
          color="secondary"
          variant="contained"
          style={{ height: '36px', width: 245.2 }}
          onClick={() => handleAction(selectedRows, 'activate')}
        >
          Activate Company
        </Button>
      </Tooltip>
      <Tooltip title={'Delete'}>
        <IconButton onClick={() => handleAction(selectedRows, 'delete')}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default CustomToolbarSelect;
