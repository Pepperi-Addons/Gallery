const { shareAll, share, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const blockName = 'gallery';

module.exports = withModuleFederationPlugin({
    name: blockName,
    filename: `${blockName}.js`,
    exposes: {
        './GalleryModule': './src/app/block/index',
        './GalleryEditorModule': './src/app/block-editor/index'
    },
    shared: {
        ...shareAll({ strictVersion: true, requiredVersion: 'auto' }),
    },
    // shared: share({
    //     "@angular/core": { strictVersion: true, requiredVersion: 'auto' }, 
    //     "@angular/common": { strictVersion: true, requiredVersion: 'auto' }, 
    //     "@angular/common/http": { strictVersion: true, requiredVersion: 'auto' }, 
    //     "@angular/router": { strictVersion: true, requiredVersion: 'auto' },
    // })
});