import * as React from 'react';
import { ColumnModel, CompareOperators } from 'tubular-common';
import { TbNotContainsIcon } from '../SvgIcons/TbNotContainsIcon';
import { TbContainsIcon } from '../SvgIcons/TbContainsIcon';
import { TbStartsWithIcon } from '../SvgIcons/TbStartsWithIcon';
import { TbNotStartsWithIcon } from '../SvgIcons/TbNotStartsWithIcon';
import { TbEndsWithIcon } from '../SvgIcons/TbEndsWithIcon';
import { TbNotEndsWithIcon } from '../SvgIcons/TbNotEndsWithIcon';
import { TbEqualsIcon } from '../SvgIcons/TbEqualsIcon';
import { TbGreaterThanIcon } from '../SvgIcons/TbGreaterThanIcon';
import { TbNotEqualsIcon } from '../SvgIcons/TbNotEqualsIcon';
import { TbGreaterOrEqualsToIcon } from '../SvgIcons/TbGreaterOrEqualsToIcon';
import { TbLessThanIcon } from '../SvgIcons/TbLessThanIcon';
import { TbLessOrEqualsToIcon } from '../SvgIcons/TbLessOrEqualsToIcon';
import { TbBetweenIcon } from '../SvgIcons/TbBetweenIcon';
import FilterListIcon from '@material-ui/icons/FilterList';
import Lang from '../utils/Lang';

export const handleFilterChange = (column: ColumnModel) => (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
) => {
    column.filterText = event.target.value;
};

export const onKeyDown = (onEnter: () => void) => (ev: React.KeyboardEvent) => {
    if (ev.keyCode === 13 && onEnter) {
        ev.preventDefault();
        ev.stopPropagation();
        onEnter();
    }
};

export interface FilterEditorProps {
    column: ColumnModel;
    onApply: () => void;
    langKey?: string;
}

export const getOperatorText = (value: CompareOperators, langKey?: string) => {

    if (langKey) {
        Lang.changeLanguage(langKey);
    }

    switch (value) {
        case CompareOperators.NotContains:
            return Lang.translate('NotContains');
        case CompareOperators.Contains:
            return Lang.translate('Contains');
        case CompareOperators.StartsWith:
            return Lang.translate('StartsWith');
        case CompareOperators.NotStartsWith:
            return Lang.translate('NotStartsWith');
        case CompareOperators.EndsWith:
            return Lang.translate('EndsWith');
        case CompareOperators.NotEndsWith:
            return Lang.translate('NotEndsWith');;
        case CompareOperators.Equals:
            return Lang.translate('Equals');
        case CompareOperators.NotEquals:
            return Lang.translate('NotEquals');
        case CompareOperators.Between:
            return Lang.translate('Between');
        case CompareOperators.Gt:
            return Lang.translate('GreaterThan');
        case CompareOperators.Gte:
            return Lang.translate('GreaterThanOrEquals');
        case CompareOperators.Lt:
            return Lang.translate('LessThan');
        case CompareOperators.Lte:
            return Lang.translate('LessThanOrEquals');
        default:
            return Lang.translate('None');
    }
};

export const getOperatorIcon = (operator: CompareOperators): JSX.Element => {
    switch (operator) {
        case CompareOperators.NotContains:
            return <TbNotContainsIcon />;
        case CompareOperators.Contains:
            return <TbContainsIcon />;
        case CompareOperators.StartsWith:
            return <TbStartsWithIcon />;
        case CompareOperators.NotStartsWith:
            return <TbNotStartsWithIcon />;
        case CompareOperators.EndsWith:
            return <TbEndsWithIcon />;
        case CompareOperators.NotEndsWith:
            return <TbNotEndsWithIcon />;
        case CompareOperators.Equals:
            return <TbEqualsIcon />;
        case CompareOperators.NotEquals:
            return <TbNotEqualsIcon />;
        case CompareOperators.Gt:
            return <TbGreaterThanIcon />;
        case CompareOperators.Gte:
            return <TbGreaterOrEqualsToIcon />;
        case CompareOperators.Lt:
            return <TbLessThanIcon />;
        case CompareOperators.Lte:
            return <TbLessOrEqualsToIcon />;
        case CompareOperators.Between:
            return <TbBetweenIcon />;
        default:
            return <FilterListIcon />;
    }
};
