// const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

// const blockName = 'gallery';

// module.exports = withModuleFederationPlugin({
//     remoteType: "module",
//     shared: {
//         ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
//     },
//     name: blockName,
//     filename: `${blockName}.js`,
//     exposes: {
//         './GalleryModule': './src/app/block/index.ts',
//         './GalleryEditorModule': './src/app/block-editor/index.ts'
//     },
// });

// const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
// const mf = require("@angular-architects/module-federation/webpack");
// const path = require("path");
// const share = mf.share;

// const sharedMappings = new mf.SharedMappings();
// sharedMappings.register(
//     path.join(__dirname, './tsconfig.json'),
//     [
//         /* mapped paths to share */
//     ]);
    
// const blockName = 'gallery';

// module.exports = {
//     output: {
//         publicPath: "auto",
//         uniqueName: `${blockName}`,
//         chunkFilename: `${blockName}.[name].js`,
//         scriptType: 'text/javascript'
//     },
//     // experiments: {
//     //     topLevelAwait: true,
//     // },
//     optimization: {
//         // Only needed to bypass a temporary bug
//         runtimeChunk: false
//     },   
//     resolve: {
//         alias: {
//             ...sharedMappings.getAliases(),
//         }
//     },
//     plugins: [
//         // new webpack.ProvidePlugin({
//         //     process: 'process/browser',
//         // }),
//         new ModuleFederationPlugin({
//             // library: { type: "var", name: blockName },
//             name: blockName,
//             filename: `${blockName}.js`,
//             exposes: {
//                 './GalleryModule': './src/app/block/index',
//                 './GalleryEditorModule': './src/app/block-editor/index'
//             },
//             shared: share({
//                 // "@angular/core": { eager: true, singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
//                 // "@angular/common": { eager: true, singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
//                 // "@angular/common/http": { eager: true, singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
//                 // "@angular/router": { eager: true, singleton: true, strictVersion: true, requiredVersion: 'auto' },
                
//                 // "@angular/core": { singleton: true, strictVersion: true, requiredVersion: '>=12.0.0' }, 
//                 // "@angular/common": { singleton: true, strictVersion: true, requiredVersion: '>=12.0.0' }, 
//                 // "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: '>=12.0.0' }, 
//                 // "@angular/router": { singleton: true, strictVersion: true, requiredVersion: '>=12.0.0' },
//                 // "@ngx-translate/core": { singleton: true, strictVersion: true, requiredVersion: '>=13.0.0' },
//                 // "@ngx-translate/http-loader": { singleton: true, strictVersion: true, requiredVersion: '>=6.0.0' },

//                 "@angular/core": { eager: true, singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
//                 "@angular/common": { eager: true, singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
//                 "@angular/common/http": { eager: true, singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
//                 "@angular/router": { eager: true, singleton: true, strictVersion: true, requiredVersion: 'auto' },

//                 ...sharedMappings.getDescriptors()
//             })
//         }),
//         sharedMappings.getPlugin()
//     ]
// };


const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const blockName = 'gallery';

module.exports = withModuleFederationPlugin({
    name: blockName,
    filename: `${blockName}.js`,
    exposes: {
        './GalleryModule': './src/app/block/index',
        './GalleryEditorModule': './src/app/block-editor/index'
    },
    shared: {
        ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    },
});