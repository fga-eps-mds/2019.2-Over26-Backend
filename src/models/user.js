'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        cpf: DataTypes.BIGINT,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        monthlyIncome: DataTypes.DECIMAL(10, 2)
    });
    User.associate = function (models) {
        User.hasOne(models.Account, {
            foreignKey: 'userId',
            as: 'account'
        });
        User.hasOne(models.Overdraft, {
            foreignKey: 'userId',
            as: 'overdraft'
        });
        User.hasMany(models.OverdraftDebt, {
            foreignKey: 'userId',
            as: 'overdraftDebt'
        });
    };
    return User;
};
