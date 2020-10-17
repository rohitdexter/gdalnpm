const { exec } = require('child_process');
const fs = require('fs')
const path = require('path');

const convertToTiff = async (pdfPath,  destinationPath,withCompression = false) => {
    try {
        if (!pdfPath)
            throw new Error(`Please provide pdf Path`)
        if (!destinationPath)
            throw new Error(`Please provide geo tiff destination path`)
        checkIfFileExists(pdfPath)
        checkIfFileExists(destinationPath)
        await checkIfFileIsPdf(pdfPath).catch(err => Promise.reject(err))
        await checkIfGdalIsInstalled().catch(err => Promise.reject(err))
        await convertPdfToGeoTiff(pdfPath, withCompression, destinationPath).catch(err => Promise.reject(err))
        return Promise.resolve(`Conversion Done Successfully`)

    }
    catch (err) {
        return Promise.reject(err)
    }
}

const convertPdfToGeoTiff = (pdfPath, withCompression, destinationPath) => {
    let gdalCommand = `gdal_translate -of GTiff -co "TILED=YES" -co "TFW=YES"`
    gdalCommand = withCompression ? `${gdalCommand}  -co "COMPRESS=LZW"` : gdalCommand
    return new Promise((resolve, reject) => {
        const pathName = pdfPath.split(/[\\/]/).pop();
        const fileName = pathName.split('.')[0]
        exec(`${gdalCommand} ${pdfPath} ${destinationPath}/${fileName}_geo.tiff`, (err, stdout, stderr) => {
            if (err)
                reject(err)
            else if (stdout)
                resolve(stdout)
            else if (stderr)
                reject(stderr)
        })
    })
}
const checkIfGdalIsInstalled = () => {
    return new Promise((resolve, reject) => {
        exec(`gdalinfo --version`, (err, stdout, stderr) => {
            if (err)
                reject(`Please install GDAL On your system or server`)
            else if (stdout)
                resolve(stdout)
            else if (stderr)
                reject(stderr)
        })
    })
}

const checkIfFileExists = (pdfPath) => {
    try {
        if (!fs.statSync(pdfPath)) {
            throw new Error(`Please provide valid pdf Path`)
        }
        else
            return true
    }
    catch (err) {
        throw err;
    }
}


const checkIfFileIsPdf = (pdfPath) => {
    return new Promise((resolve, reject) => {
        const data = path.extname(pdfPath)
        if (data) {
            if (data === '.pdf')
                resolve(data)
            else
                reject(`Please Provide geospatial Pdf File`)

        }
        else
            reject(`Please provide a geospatial Pdf File`)

    })
}
module.exports = { convertToTiff }