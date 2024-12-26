const bcrypt = require('bcrypt');
const saltRounds = 10;
const Sequelize = require('sequelize');

(async () => {

    //test connection
    var sequelize = new Sequelize("postgres", "postgres", "postgres", {
        dialect: 'postgres'
    });

    sequelize.authenticate().then(function(errors) { console.log(errors) });

   
    const User = require('./models/user');

    try {
        
        let password = '123456789'
        bcrypt
            .hash(password, saltRounds)
            .then(async hash => {
                const resultadoCreate = await User.create({
                    name: 'User one',
                    email: 'user@email.com',
                    password: hash
                })
                console.log(resultadoCreate);
            })
            .catch(err => console.error(err.message))
            
        const result = User.findAll({
            where: {
                name: 'User one',
            },
        }); 


        const user = await User.findOne({ where: { email: 'user@email' } });
        if (user === null) {
            console.log('Not found!');
        } else {
            User.update(
                { name: 'User two' },
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