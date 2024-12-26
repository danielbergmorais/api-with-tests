const bcrypt = require('bcrypt');
const saltRounds = 10;
const Sequelize = require('sequelize');

//index.js
(async () => {
    const User = require('./models/user');

    try {
        /*
        let password = '123456789'
        bcrypt
            .hash(password, saltRounds)
            .then(async hash => {
                const resultadoCreate = await User.create({
                    name: 'Daniel',
                    email: 'danielbergmorais@dev.com',
                    password: hash//, (err, hash)
                })
                console.log(resultadoCreate);
            })
            .catch(err => console.error(err.message))
            
        const result = User.findAll({
            where: {
                name: 'Daniel',
            },
        });*/

        //const user = await User.findByPk('5e3e7364-bdcf-4252-9c31-0295b92673f7', {});
        const user = await User.findOne({ where: { email: 'danielbergmorais@dev.com' } });
        if (user === null) {
            console.log('Not found!');
        } else {
            User.update(
                { name: 'Daniel' },
                {
                    where: {
                        id: user.id,
                    },
                },
            )
        }

        /*await User.update(
                    { lastName: 'Doe' },
                    {
                        where: {
                            lastName: null,
                        },
                    },
                );*/

    } catch (error) {
        console.log(error);
    }
})();