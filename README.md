This package is used to convert geospatial pdf to geotiff file in one go.(No Extra NPM modules is required)

Installation:-
1) First Install GDAL on your system.
    This is the way to install GDAL in your system(LINUX):-
    * sudo add-apt-repository ppa:ubuntugis/ppa
    * sudo apt-get update
    * sudo apt-get install gdal-bin
    * ogrinfo --version

2)Method Name:- 
    
    convertToTiff(originGeoPdfPath, allowCompression, destinationGeoTiffFolderName)
    
    * originGeoPdfPath(string):- The Complete Path where your geospatial pdf is present
    
    * allowCompression(boolean):- To allow compression or not by default it is false if you want to allow compression pass true
    
    *destinationGeoTiffFolderName(string):-The comeplete path of the folder where you want to save your converted geotiff files
    
    *return Promises

3)Sample Code to perform conversion
   
    const GdalNpm = require('gdalnpm')  //require NPM
    
    const path = require('path')        //require path

    //originGeoPdfPath:- The Complete Path where your geospatial pdf is present

    //allowCompression:- To allow compression or not by default it is false if you want to allow compression pass true

    //destinationGeoTiffFolderName:-The comeplete path of the folder where you want to save your converted geotiff files

    const ConvertToGeoTiff = async (originGeoPdfPath, allowCompression, destinationGeoTiffFolderName) => {
    try {
        return await GdalNpm.convertToTiff(originGeoPdfPath, allowCompression, destinationGeoTiffFolderName)
    }
    catch (err) {
        throw err;
    }
    }

    await ConvertToGeoTiff(path.join(__dirname, 'geospatial.pdf'), true, path.join(__dirname, 'geotiff')).catch(err => console.log(err))


    Enjoy!!!! Happy Coding!!!!!

