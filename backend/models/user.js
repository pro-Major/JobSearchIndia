const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            field: 'name',
            allowNull : false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            field: 'email',
            validate: {
                len: {
                    args: [0, 100]
                }
            },
            allowNull : false
        },
        roleId: {
            type: DataTypes.INTEGER,
            field: 'role_id',
            defaultValue: '3'
        },
        password: {
            type: DataTypes.TEXT,
            field: 'password',
            allowNull : false
        },
        modifiedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        isEmailVerified: {
            type: DataTypes.BOOLEAN,
            default: false,
            defaultValue: false
        },
        mobileNumber: {
            type: DataTypes.STRING,
            unique: true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            field: 'is_active',
            defaultValue: true
        }
    }, {
        freezeTableName: true,
        tableName: 'users',
        paranoid: true,
    });

    User.associate = function (models) {

    }
    // This hook is always run before create.
    User.beforeCreate(function (user, options, cb) {
        if (user.password) {
            return new Promise((resolve, reject) => {
                bcrypt.genSalt(10, function (err, salt) {
                    if (err) {
                        return err;
                    }
                    bcrypt.hash(user.password, salt, function (err, hash) {
                        if (err) {
                            return err;
                        }
                        user.password = hash;
                        return resolve(user, options);
                    });
                });
            });
        }
    });

    // This hook is always run before update.
    User.beforeUpdate(function (user, options, cb) {
        if (user.password) {
            return new Promise((resolve, reject) => {
                bcrypt.genSalt(10, function (err, salt) {
                    if (err) {
                        return err;
                    }
                    bcrypt.hash(user.password, salt, function (err, hash) {
                        if (err) {
                            return err;
                        }
                        user.password = hash;
                        return resolve(user, options);
                    });
                });
            });
        }
    });

    // // Instance method for comparing password.
    // User.prototype.comparePassword = function (passw, cb) {
    //     return new Promise((resolve, reject) => {
    //         bcrypt.compare(passw, this.password, function (err, isMatch) {
    //             if (err) {
    //                 return err;
    //             }
    //             return resolve(isMatch)
    //         });
    //     });
    // };
    //Check if password is correct
    User.prototype.isPasswordMatch = async function (password) {
        const user = this;
        return bcrypt.compare(password, user.password);
      };

    // This will not return password, refresh token and access token.
    User.prototype.toJSON = function () {
        let values = Object.assign({}, this.get());
        delete values.password;
        return values;
    }

    return User;

}