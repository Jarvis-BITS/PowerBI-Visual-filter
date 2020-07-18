# PowerBI-Visual-Filter <br>
[![License: GPL v3](https://img.shields.io/badge/License-MIT-green.svg)](https://www.gnu.org/licenses/gpl-3.0)
## For release 1.0, the visual is first focusing on showing invalid number of items:
<br>
A custom visual developed for Microsoft PowerBI which filters PowerBI report by list and provides robust output(whether filtered keyword is present in database or not) accordingly.<br>

### Steps for installing necessary development packages:
1. Install [Node.js](https://nodejs.org/en/download/)
2. Open PowerShell(For Windows) and enter the following code line-by-line:
   ```console
   npm i -g powerbi-visuals-tools
   pbiviz --install-cert
   npm i d3@^5.0.0 --save
   npm i @types/d3@^5.0.0 --save
   npm i core-js@3.2.1 --save
   npm i powerbi-visuals-api --save-dev
   ```
Filter Visual Working steps 
------------ |
Show only the applied filter value of dataset | 
Output an error message for invalid list of search items(if any) | 

### Usage

You can learn more about using these tools in the following guides

* [Installation Guide](https://docs.microsoft.com/en-us/power-bi/developer/visuals/custom-visual-develop-tutorial#setting-up-the-developer-environment)
* [Usage Guide](https://docs.microsoft.com/en-us/power-bi/developer/visuals/custom-visual-develop-tutorial#creating-a-custom-visual)
* [Debugging Guide](https://microsoft.github.io/PowerBI-visuals/docs/how-to-guide/how-to-debug)
----
   <sup>Note: You need to have a text editor/IDE environment for development, I recommend [Visual Studio Code](https://code.visualstudio.com/)

#### Issues:
- [ ] Implement Multi-input filter model ([#2][i1])
- [ ] Implement output textbox to check incorrect values

[i1]: https://github.com/Jarvis-BITS/PowerBI-Visual-filter/issues/2
