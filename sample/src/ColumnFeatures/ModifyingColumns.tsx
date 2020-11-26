import * as React from 'react';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Switch from '@material-ui/core/Switch';
import { LocalStorage, createColumn } from 'tubular-common';
import { DataGrid } from '../../../src';
import { ToolbarOptions } from '../../../src/Toolbar/ToolbarOptions';
import columns from '../data/columns';
import localData from '../data/localData';

const ModifyingColumns: React.FunctionComponent = () => {
    const [getErrorMessage, setErrorMessage] = React.useState(null as string);
    const [gridColumns, setGridColumns] = React.useState(columns);
    const [columnCounter, setColumnCounter] = React.useState(0);
    const [gridFeatures, enableGridFeatures] = React.useState(true);

    const handleAddColumn = () => {
        setGridColumns([
            ...gridColumns,
            createColumn(`Column ${columnCounter}`, {
                filterable: true,
                searchable: true,
                sortable: true,
            }),
        ]);

        setColumnCounter(columnCounter + 1);
    };

    const handleDeleteLastColumn = () => {
        setGridColumns([...gridColumns.filter(c => c.name !== gridColumns[gridColumns.length - 1].name)]);
    };

    const handleGridFeatures = () => {
        enableGridFeatures(!gridFeatures)
    }

    const toolbarOptions = new ToolbarOptions({
        customItems: (
            <div>
                <Button onClick={handleAddColumn}>Add new column</Button>
                <Button onClick={handleDeleteLastColumn}>Delete last column</Button>
            </div>
        ),
        gridFeatures: gridFeatures,
    });

    return (
        <div className="root">
            {getErrorMessage && (
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    style={{ paddingTop: '10px' }}
                    open={true}
                    ContentProps={{ 'aria-describedby': 'message-id' }}
                    message={<span id="message-id">{getErrorMessage}</span>}
                />
            )}
            <div>Grid features<Switch checked={gridFeatures} onClick={handleGridFeatures} />{gridFeatures ? 'enabled' : 'disabled'}</div>
            <DataGrid
                columns={gridColumns}
                dataSource={localData}
                gridName="ModifyingColumns"
                storage={new LocalStorage()}
                onError={setErrorMessage}
                toolbarOptions={toolbarOptions}
                langKey="fr"
            />
        </div>
    );
};

export default ModifyingColumns;
