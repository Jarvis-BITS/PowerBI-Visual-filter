import { Visual } from "../../src/visual";
import powerbiVisualsApi from "powerbi-visuals-api"
import IVisualPlugin = powerbiVisualsApi.visuals.plugins.IVisualPlugin
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions
var powerbiKey: any = "powerbi";
var powerbi: any = window[powerbiKey];

var visual217B56EDD81A4BE4A65CA8AF6A599C31_DEBUG: IVisualPlugin = {
    name: 'visual217B56EDD81A4BE4A65CA8AF6A599C31_DEBUG',
    displayName: 'Advanced Filter',
    class: 'Visual',
    apiVersion: '2.6.0',
    create: (options: VisualConstructorOptions) => {
        if (Visual) {
            return new Visual(options);
        }

        throw 'Visual instance not found';
    },
    custom: true
};

if (typeof powerbi !== "undefined") {
    powerbi.visuals = powerbi.visuals || {};
    powerbi.visuals.plugins = powerbi.visuals.plugins || {};
    powerbi.visuals.plugins["visual217B56EDD81A4BE4A65CA8AF6A599C31_DEBUG"] = visual217B56EDD81A4BE4A65CA8AF6A599C31_DEBUG;
}

export default visual217B56EDD81A4BE4A65CA8AF6A599C31_DEBUG;