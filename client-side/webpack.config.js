const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const blockName = 'gallery';

const webpackConfig = withModuleFederationPlugin({
    name: blockName,
    filename: `${blockName}.js`,
    // library: { type: "var", name: blockName },
    exposes: {
        // './GalleryModule': './src/app/block/index',
        // './GalleryEditorModule': './src/app/block-editor/index',
        './WebComponents': './src/bootstrap.ts',
    },
    shared: {
        ...shareAll({ strictVersion: true, requiredVersion: 'auto' }),
    }
});

module.exports = {
    ...webpackConfig,
    output: {
        ...webpackConfig.output,
        uniqueName: blockName,
    },
};


// const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
// const blockName = 'gallery';
// const mf = require('@angular-architects/module-federation/webpack');
// const share = mf.share;

// module.exports = {
//     output: {
//         publicPath: "auto",
//         uniqueName: blockName
//     },
//     optimization: {
//         // Only needed to bypass a temporary bug
//         runtimeChunk: false
//     },
//     plugins: [
//         new ModuleFederationPlugin({

//             // For remotes (please adjust)
//             name: blockName,
//             filename: `${blockName}.js`,
//             library: { type: "var", name: blockName },
//             exposes: {
//                 './web-components': './src/bootstrap.ts',
//             },

//             shared: share({
//                 "@angular/core": { requiredVersion:'auto' }, 
//                 "@angular/common": { requiredVersion:'auto' }, 
//                 "@angular/router": { requiredVersion:'auto' },
//                 "rxjs": { requiredVersion:'auto' }
//             })
//         })
//     ],
// };