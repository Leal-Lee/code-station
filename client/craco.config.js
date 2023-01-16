

const { whenDev } = require("@craco/craco");

    

  module.exports = {
    webpack: {
      configure: { 
        
        output:{
       filename: whenDev(()=>'assets/js/[name].[contenthash:8].js','assets/js/bundle.js'),
        chunkFilename: whenDev(()=>'assets/js/[name].[contenthash:8].chunk.js','assets/js/[name].chunk.js'),
        assetModuleFilename: 'assets/media/[name].[hash][ext]',
        }
        
       },
  
    },
    };