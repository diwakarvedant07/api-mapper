const { match } = require('assert');
const fs = require('fs');
const path = require('path');

function apiMap(app) {

    const baseDir = app.get('baseDir') || process.cwd();

    const jsFiles = findJsFiles(baseDir);

    let totalRoutes = 0;

    const routeFiles = countRoutes(jsFiles[0])
    console.log()

    // jsFiles.forEach(file => {
    //     const routeCount = countRoutes(file);
    //     totalRoutes += routeCount;
    // });

    // console.log("total routes : ", totalRoutes)
}

function findJsFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory() && file !== 'node_modules') {
            findJsFiles(filePath, fileList);
        } else if (stat.isFile() && file.endsWith('.js')) {
            fileList.push(filePath);
        }
    });

    return fileList;
}

function countRoutes(file, basePath = '/') {
    const data = fs.readFileSync(file, 'utf8');
    const routeRegex = /\b(app|router)\.(get|post|put|delete|patch|options|head|all)\s*\(\s*['"`]\s*([^'"`]+?)\s*['"`]/g;
    const matchRegex = /app\.(get|post|put|delete|patch|head|options)\s*\(/g;
    const routes = [];
    const apiRouteFiles = []


    while ((testing = routeRegex.exec(data)) !== null) {
        console.log(testing)
        if(testing[3] == 'baseDir'){
            testing[3] = '/'
        }
        var obj = {
            method: testing[2].toUpperCase(),
            path: testing[3]
        }
        if (obj) {
            routes.push(obj);
        }

    }

    

    const matches = data.match(routeRegex);
    //console.log(match[2])
    if(routes.length !== 0){
        apiRouteFiles.push(file)
        // console.log(`- File: ${file}, Routes: ${matches ? matches.length : 0}`)
        // routes.forEach((route)=>{
        //     console.log("|---\t", `method: ${route.method} | path: ${route.path}`)
        // })
        
        // console.log("\n\n")
    }
    

    return apiRouteFiles
}

module.exports = {
    apiMap,
};