import TableBody from '@material-ui/core/TableBody';
import * as React from 'react';
import { ITbTableInstance } from 'tubular-react-common';
import { TbRowProps, TbRow } from '../BareBones/TbRow';
import DetailComponent from '../DataGridInterfaces/DetailComponent';
import { renderCells } from '../utils';
import MasterDetailRow from './MasterDetailRow';
import { NoDataRow } from './NoDataRow';
import { TbSelection } from '../utils/Selection';

interface GridBodyProps {
    detailComponent?: React.ReactElement<DetailComponent>;
    tbTableInstance: ITbTableInstance;
    rowComponent: React.FunctionComponent<TbRowProps>;
    rowSelectionEnabled?: boolean;
    onRowClick?(row: any): void;
    selection?: TbSelection;
    langKey?: string;
}

const getStyles = (isPointer: boolean) => ({
    row: { cursor: isPointer ? 'pointer' : 'auto' },
    title: { paddingLeft: '15px' },
});

const generateOnRowClickProxy = (onRowClick: any) => {
    return (row: any) => () => {
        if (onRowClick) {
            onRowClick(row);
        }
    };
};

export const GridBody: React.FunctionComponent<GridBodyProps> = ({
    tbTableInstance,
    rowComponent,
    onRowClick,
    detailComponent,
    rowSelectionEnabled,
    selection,
    langKey,
}: GridBodyProps) => {
    const styles = getStyles(Boolean(onRowClick));
    const RowComponent = rowComponent ? rowComponent : TbRow;
    const onRowClickProxy = onRowClick ? generateOnRowClickProxy(onRowClick) : (_row: any): (() => void) => void 0;
    const { state } = tbTableInstance;

    let content = null;

    if (state.filteredRecordCount === 0 && !state.isLoading) {
        content = <NoDataRow columns={state.columns} styles={styles} langKey={langKey}/>;
    } else {
        content = state.data.map((row: any, rowIndex: number) => {
            if (detailComponent) {
                
                return (
                    <MasterDetailRow
                        detail={detailComponent}
                        renderCells={renderCells(state.columns, row, langKey)}
                        clickEvent={onRowClickProxy}
                        style={styles.row}
                        key={rowIndex}
                        rowData={row}
                        columns={state.columns}
                    />
                );
            }

            return (
                <RowComponent
                    row={row}
                    key={rowIndex}
                    rowIndex={rowIndex}
                    columns={state.columns}
                    onRowClick={onRowClickProxy(row)}
                    rowSelectionEnabled={rowSelectionEnabled}
                    selection={selection}
                    langKey={langKey}
                />
            );
        });
    }

    return <TableBody>{content}</TableBody>;
};
