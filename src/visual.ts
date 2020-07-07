/*
*  Power BI Visual CLI
*
*  Copyright (c) Microsoft Corporation
*  All rights reserved.
*  MIT License
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the ""Software""), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.
*
*  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*/
"use strict";

import "core-js/stable";
import "./../style/visual.less";
import * as tooltip from 'powerbi-visuals-utils-tooltiputils';
import * as models from 'powerbi-models';

import DataView = powerbi.DataView;
import DataViewSingle = powerbi.DataViewSingle;
import DataViewObjectPropertyIdentifier = powerbi.DataViewObjectPropertyIdentifier;

import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IVisualHost = powerbi.extensibility.IVisualHost;
import FilterAction = powerbi.FilterAction;
import FilterManager = powerbi
import powerbi from "powerbi-visuals-api";
import PrimitiveValue = powerbi.PrimitiveValue;

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;



import { VisualSettings } from "./settings";
import { data, transformData } from './data';
import { Primitive } from "d3";

//const models: any = window["powerbi-models"];
//Creating a class called Visual which stores all the reqd. variables like Buttons, SearchBoxes etc.

export class Visual implements IVisual {
    private target: HTMLElement; //Target is the variable to store the targetted data i.e Part_Numbers in our case
    //Creating buttons and boxes:
    private searchBox: HTMLInputElement;
    private searchButton: HTMLButtonElement;
    private ClearButton: HTMLButtonElement;
    private column: powerbi.DataViewMetadataColumn;  //Varaible to store column data 
    private settings: VisualSettings;
    private valueText: HTMLParagraphElement;
    private host: powerbi.extensibility.visual.IVisual
    private output: HTMLLIElement;

    //Constructor is a function which gets automatically executed whenever the class object is initialized
    constructor(options: VisualConstructorOptions) {
        this.target = options.element;
        this.target.innerHTML = `<div class = "filter-by-list">
                                <form action="/action_page.php">
                                <label for="search-field">Filter Input:</label>
                                <textarea id="Enter your search" name="search-field" rows="4" cols="50">
                                Incorrect Values:  
                                </textarea>
                                <br><br>
                                <input type="submit" value="Submit">
                                </form>
                                </div>`;
        this.searchBox = this.target.childNodes[0].childNodes[1] as HTMLInputElement;
        this.searchBox.addEventListener("keydown", (e) => {
            if (e.keyCode == 13) {
                this.performSearch(this.searchBox.value)
            }
        });
        this.searchButton = this.target.childNodes[0].childNodes[3] as HTMLButtonElement;
        this.searchButton.addEventListener("click", () => this.performSearch(this.searchBox.value));
        this.ClearButton = this.target.childNodes[0].childNodes[5] as HTMLButtonElement;
        this.ClearButton.addEventListener("click", () => this.performSearch(''));

        //this.host = options.host;
    }
    /** 
         * Perfom search/filtering in a column
         * @param {string} text - text to filter on
         */

    //Function to filter the report; it takes the user input as text(string)
    public filter(text: string) {
        const advancedFilter = new models.AdvancedFilter(
            {
                table: this.column.queryName.substr(0, this.column.queryName.indexOf('.')),
                column: this.column.queryName.substr(this.column.queryName.indexOf('.') + 1)
            },
            "Or",
            {
                operator: "Contains",
                value: "Power"
            },
            {
                operator: "Contains",
                value: "Microsoft"
            }
        )
    };
    public performSearch(text: string) {
        if (this.column) {
            const isBlank = ((text || "") + "").match(/^\s*$/);
            const target = {
                table: this.column.queryName.substr(0, this.column.queryName.indexOf('.')),
                column: this.column.queryName.substr(this.column.queryName.indexOf('.') + 1)
            };

            let filter: any = null;
            let action = FilterAction.remove;
            if (!isBlank) {
                filter = new models.AdvancedFilter(
                    target,
                    "And",
                    {
                        operator: "Contains",
                        value: text
                    }
                );
                action = FilterAction.merge;
            }
            //this.host.applyJsonFilter(filter, "general", "filter", action);
        }
        this.searchBox.value = text;
    }

    public update(options: VisualUpdateOptions) {
        const metadata = options.dataViews && options.dataViews[0] && options.dataViews[0].metadata;
        const newColumn = metadata && metadata.columns && metadata.columns[0];
        const dataView: DataView = options.dataViews[0];

        this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);

        //Transformdata is a func which takes HTML parsed data as input and transforms it into manupilatable form i.e data.values which is an array storing part_number
        transformData(options);
        console.log(data.values);

    }

    //Varaible to return 
    private static parseSettings(dataView: DataView): VisualSettings {
        return <VisualSettings>VisualSettings.parse(dataView);
    }

    /**
     * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
     * objects and properties you want to expose to the users in the property pane.
     *
     */
    public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
        return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
    }
}