module.exports = (sequelize,DataTypes) => { 
    const Token = sequelize.define('token',{
          token: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          userId : {
            type : DataTypes.INTEGER,
            allowNull: false,
          },
          blacklisted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
          },
          type: {
            type: DataTypes.ENUM(['refresh', 'reset_password', 'verify_email']),
            enum: ['refresh', 'reset_password', 'verify_email'],
            required: true,
          },
    },{
        freezeTableName: true,
        tableName: 'token',
    })
    Token.associate = function(models) {
        Token.belongsTo(models.user,{foreignKey : 'userId'})
    }
    return Token;

}