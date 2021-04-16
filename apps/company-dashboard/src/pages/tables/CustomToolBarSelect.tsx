import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';

interface Props {
  selectedRows: Object;
  handleAction: (value: Object, type: string) => void;
}

const CustomToolbarSelect = (props: Props) => {
  const { selectedRows, handleAction } = props;

  return (
    <div className={'custom-toolbar-select'}>
      <Tooltip title={'Delete'}>
        <IconButton onClick={() => handleAction(selectedRows, 'delete')}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default CustomToolbarSelect;
