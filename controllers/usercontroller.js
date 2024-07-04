const csvParser = require('../utils/csvParser');
const User = require('../models/user');

exports.uploadCSV = async (req, res) => {
    try {
        const filePath = './uploads/sample.csv';
        const users = await parseCSV(filePath); // Corrected import statement

        // Transform users data before inserting to MongoDB
        const transformedUsers = users.map(user => ({
            name: user['name.firstName'] + ' ' + user['name.lastName'],
            age: parseInt(user.age),
            address: {
                line1: user['address.line1'],
                line2: user['address.line2'],
                city: user['address.city'],
                state: user['address.state']
            },
            additional_info: {
                gender: user.gender
            }
        }));

        await User.insertMany(transformedUsers);

        // Calculate age distribution
        const ageGroups = {
            '< 20': 0,
            '20 to 40': 0,
            '40 to 60': 0,
            '> 60': 0
        };

        transformedUsers.forEach(user => {
            if (user.age < 20) ageGroups['< 20']++;
            else if (user.age >= 20 && user.age <= 40) ageGroups['20 to 40']++;
            else if (user.age > 40 && user.age <= 60) ageGroups['40 to 60']++;
            else if (user.age > 60) ageGroups['> 60']++;
        });

        console.log('Age-Group % Distribution');
        const totalUsers = transformedUsers.length;
        for (const group in ageGroups) {
            console.log(`${group}: ${(ageGroups[group] / totalUsers * 100).toFixed(2)}%`);
        }

        res.status(200).send('CSV data processed and inserted into MongoDB successfully.');
    } catch (error) {
        console.error('Error processing CSV:', error);
        res.status(500).send('An error occurred while processing the CSV file.');
    }
};
