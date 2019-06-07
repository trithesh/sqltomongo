create a config file with below code and relpace according to your, 

module.exports = {
    mysql: {
        host: 'localhost',
        user: '[dbusername]',
        password: '[dbpassword]',
        database: '[dbname]'
    },
    mongodbUrl: '[mongodb://127.0.0.1:27017/dbname]'

}

------------------------------------------------------------


use Dump20190606 to create tables in mysql
and create a db in monogo use db name in config file