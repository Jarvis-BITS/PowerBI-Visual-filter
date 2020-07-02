'use strict'

import powerbi from "powerbi-visuals-api";
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import PrimitiveValue = powerbi.PrimitiveValue;

export let data: VData;

interface VData {
    values: PrimitiveValue[],
    column: string,
    table: string
}

export function transformData(options: VisualUpdateOptions) {
    let dataView = options.dataViews;

    // Default Values:
    data = {
        values: [],
        column: '',
        table: ''
    }

    // Checking if we have data, if not just return and update data with default values
    if (!dataView ||
        !dataView[0] ||
        !dataView[0].categorical ||
        !dataView[0].categorical.categories ||
        !dataView[0].categorical.categories[0] ||
        !dataView[0].categorical.categories[0].values ||
        !dataView[0].categorical.categories[0].source) {
        return;
    }

    let cat = dataView[0].categorical.categories[0];
    let dotIx = cat.source.queryName.indexOf('.');
    data.table = cat.source.queryName.substr(0, dotIx);
    data.column = cat.source.queryName.substr(dotIx + 1);
    data.values = cat.values;

}