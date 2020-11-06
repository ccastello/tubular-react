import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Warning from '@material-ui/icons/Warning';
import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import Lang from '../utils/Lang';

export interface NoDataRowProps {
    columns: ColumnModel[];
    styles: any;
    langKey?: string;
}

export const NoDataRow: React.FunctionComponent<NoDataRowProps> = ({ columns, styles, langKey }: NoDataRowProps) => {
    
    if (langKey) {
        Lang.changeLanguage(langKey);
    }
    
    return (
        <TableRow>
            <TableCell colSpan={columns.filter((col: ColumnModel) => col.visible).length}>
                <Typography style={styles.title} variant="body2" gutterBottom={true}>
                    <Warning /> {Lang.translate('NoRecords')}
                </Typography>
            </TableCell>
        </TableRow>
    );
}
