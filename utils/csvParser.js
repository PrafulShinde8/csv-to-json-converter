const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const parseCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(path.resolve(__dirname, filePath))
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (err) => reject(err));
    });
};

module.exports = parseCSV;
