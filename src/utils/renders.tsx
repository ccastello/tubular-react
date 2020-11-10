import TableCell from '@material-ui/core/TableCell';
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import * as React from 'react';
import { ColumnDataType, ColumnModel, getColumnAlign } from 'tubular-common';
import DateFnsAdapter from '@date-io/date-fns'
import fr from 'date-fns/locale/fr'

export const renderCellContent: any = (column: ColumnModel, row: any, langKey: string) => {

    /* @todo add locales  */
    let locale = null 
    switch (langKey) {
        case 'fr':
            locale = fr;
            break;
    }

    const dateFns = new DateFnsAdapter ({locale: locale})
    let value = row[column.name]
    let sValue = ''

    switch (column.dataType) {
        case ColumnDataType.Numeric:
            return row[column.name] || 0;
        case ColumnDataType.Date:
            sValue = (value) ? dateFns.format (dateFns.date(value), 'keyboardDate') : ''
            return sValue;
        case ColumnDataType.DateTime:
        case ColumnDataType.DateTimeUtc:
            sValue = (value) ? dateFns.format (dateFns.date(value), 'keyboardDateTime24h') : ''
            return sValue
        case ColumnDataType.Boolean:
            return row[column.name] === true ? <CheckBox /> : <CheckBoxOutlineBlank />;
        default:
            return row[column.name];
    }
};

export const renderDefaultListItem: any = (columns: ColumnModel[], row: any) =>
    columns
        .filter((col: ColumnModel) => col.visible)
        .map((column: ColumnModel) => <div key={column.name}>{renderCellContent(column, row)}</div>);

export const renderCells: any = (columns: ColumnModel[], row: any, langKey: string) =>
    columns
        .filter((col: ColumnModel) => col.visible)
        .map((column: ColumnModel) => (
            <TableCell
                key={column.name}
                padding={column.label === '' ? 'none' : 'default'}
                align={getColumnAlign(column)}
            >
                {renderCellContent(column, row, langKey)}
            </TableCell>
        ));
