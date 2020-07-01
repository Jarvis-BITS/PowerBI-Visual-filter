# PowerBI-Visual-Filter
A custom visual developed for Microsoft PowerBI which filters PowerBI report by list and provides robust output(whether filtered keyword is present in database or not) accordingly.

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
<sup>Visit [Microsoft-Developing PowerBI Visuals](https://docs.microsoft.com/en-us/power-bi/developer/visuals/custom-visual-develop-tutorial) for full installation guide
Filter Visual Working steps 
------------ |
Show only the applied filter value of dataset | 
Output an error message for invalid list of search items(if any) | 
----
   <sup>Note: You need to have a text editor/IDE environment for the development, I recommend [Visual Studio Code](https://code.visualstudio.com/)
