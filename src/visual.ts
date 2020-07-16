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
    private Box_Search: HTMLInputElement
    private Button_Search: HTMLButtonElement;
    private Button_Clear: HTMLButtonElement;
    private column: powerbi.DataViewMetadataColumn;  //Varaible to store column data 
    private settings: VisualSettings;
    private valueText: HTMLParagraphElement;
    private host: powerbi.extensibility.visual.IVisual
    private output: HTMLLIElement;


    //Constructor is a function which gets automatically executed whenever the class object is initialized
    constructor(options: VisualConstructorOptions) {

        this.target = options.element;
        var x = document.createElement("textarea");
        document.body.appendChild(x);
        function Search() {
            alert("I am an alert box!");
        }
        function output() {
            document.getElementById("demo").innerHTML = "Output";
        }

        //code for the HTML output visual i.e Textbox, buttons etc.

        this.target.innerHTML = `<div class = "invalid-value-search">
                                <input style="height:50px;font-size:10pt;" id="myInput" aria-label="Enter your search" type="text" size="40" placeholder="Search for invalid Part_nos">
                                <br>
                                <button class="c-glyph search-button" onclick="document.getElementById('myInput').value='' class="btn btn-primary py-3 px-5">Invalid item search</button>
                                <button class="c-glyph clear-button" name="clear-button" onclick="document.getElementById('myInput').value = ''>Clear</button>

                                </div>`;



        this.Box_Search = this.target.childNodes[0].childNodes[1] as HTMLInputElement;
        this.Box_Search.addEventListener("keydown", (e) => {
            if (e.keyCode == 13) {
                this.invalid_search(this.Box_Search.value); 
            }
        });
        this.Button_Search = this.target.childNodes[0].childNodes[3] as HTMLButtonElement;
        //Backup option for 
        //this.Button_Search.addEventListener("click", () => this.invalid_search(this.Box_Search.value));
        this.Button_Clear = this.target.childNodes[0].childNodes[5] as HTMLButtonElement;
      

    }

    /** 
    * Perfom search/filtering in a column
    * @param {string} text - text to filter on
    */

    

    //Function to perform invalidation search, text is the user input for validation & Part_nos is the array of part numbers
    public invalid_search(text: string, Part_nos) {
        var numArr = text.split(','); //Splitting user input text by commas and storing it in an array called numArr
        var data_len = Part_nos.length();
        var input_len = numArr.length()
        const invalid_items = []; //Variable to store invalid items list
        var i, j;
        var flag = 0;
        // Below code loops through data to check if input value is present in report data
        // Assumption: Input value is not present in data i.e input value is invalid
        // Therefore if input value is valid, flag is set to 1
        for (i = 0; i < input_len; i++, flag = 0) {
            for (j = 0; j < data_len; j++) {
                if (Part_nos[j] === numArr[i]) {
                    flag = 1;
                    break;
                }
                if (flag) {
                    invalid_items.push(numArr[i]);
                }
            }
        }
        return invalid_items;

    }

    public update(options: VisualUpdateOptions) {
        
        //Transformdata is a func called from data.ts which takes in the report data and captures part numbers in form of data.Part_nos as an array
        transformData(options);
        console.log(data.Part_nos); //Part numbers get outputted onto developers tools/console in chrome settings
        let searchText = "";

        this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
        
        // Note:Alert boxes don't work in PowerBI, find another way for reliable output
        // alert("I am an alert box");

        this.Box_Search.value = searchText;

        


    }

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