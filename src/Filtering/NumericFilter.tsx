import * as React from 'react';
import { onKeyDown, FilterEditorProps } from './utils';
import { CompareOperators } from 'tubular-common';
// import { ITextStyles } from 'office-ui-fabric-react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Lang from '../utils/Lang'

// const secondInputStyle: ITextStyles = {
//     root: {
//         marginTop: 5,
//     },
// };

export const NumericFilter = ({ column, onApply, langKey }: FilterEditorProps) => {

    if (langKey) {
        Lang.changeLanguage(langKey);
    }

    const handleFilterChange = (isSecondInput?: boolean) => (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        const newValue = event.target.value;
        if (isSecondInput) {
            column.filterArgument = [];
            column.filterArgument[0] = newValue;
        } else {
            column.filterText = newValue;
        }
    };

    const isBetween = column.filterOperator === CompareOperators.Between;

    return (
        <Grid container={true} direction="column">
            <Grid item={true}>
                <TextField
                    label={''}
                    type="number"
                    placeholder={isBetween ? Lang.translate('From') : Lang.translate('TypeNumber')}
                    onChange={handleFilterChange()}
                    defaultValue={column.filterText}
                    onKeyDown={onKeyDown(onApply)}
                />
            </Grid>
            {isBetween && (
                <Grid item={true}>
                    <TextField
                        label={''}
                        type="number"
                        placeholder={Lang.translate("To")}
                        onChange={handleFilterChange(true)}
                        defaultValue={column.filterArgument ? column.filterArgument[0] : ''}
                        onKeyDown={onKeyDown(onApply)}
                    />
                </Grid>
            )}
        </Grid>
    );
};
