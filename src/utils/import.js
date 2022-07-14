// autoImportComponents function to auto import components from src/component/UI folder without fs and path module

export default function autoImportComponents() {
    //get all files in src/component/UI folder
    const components = require.context('../../src/components/UI', true, /\.vue$/)
    //for each file in folder
    const exportComponents = []
    components.keys().forEach((key) => {
        //get file name
        const component = components(key)
        //get file name without extension
        const componentName = key.replace(/^\.\/(.*)\.\w+$/, '$1')
        //import component
        exportComponents.push(component)
    })
    return exportComponents
}
//# sourceMappingURL=import.js.map
