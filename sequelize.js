const Sequelize = require('sequelize');

const AdminModel = require('./models/Admin');
const UserModel  = require('./models/User');
const PlanningModel  = require('./models/plannings');
const PositionModel  = require('./models/position');
const ClientModel  = require('./models/Client');
const EntityModel  = require('./models/Entities');
const GroupsModel  = require('./models/Group');
const SubEntityModel  = require('./models/Sub_Entities');
const crypto = require('crypto');
const sequelize = new Sequelize('project', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
};

const Admins = AdminModel(sequelize, Sequelize);
const Users = UserModel(sequelize,Sequelize);
const Plannings = PlanningModel(sequelize,Sequelize);
const Positions = PositionModel(sequelize,Sequelize);
const Clients = ClientModel(sequelize,Sequelize);
const Entities = EntityModel(sequelize,Sequelize);
const SubEntities = SubEntityModel(sequelize,Sequelize) ;
const Groups = GroupsModel(sequelize,Sequelize) ;
Users.belongsTo(Clients);
Clients.hasMany(Users);
SubEntities.belongsTo(Entities);
Entities.hasMany(SubEntities);
Entities.belongsTo(Clients);
Clients.hasMany(Entities);
Entities.belongsTo(Groups);
Groups.hasMany(Entities);
Groups.belongsTo(Clients);
Clients.hasMany(Groups);
Plannings.belongsTo(Clients);
Clients.hasMany(Plannings);
Plannings.belongsTo(Groups);
Groups.hasMany(Plannings);
Positions.belongsTo(Plannings);
Positions.belongsTo(SubEntities);
//Positions.hasMany(Users);


sequelize.sync({ force: false })
    .then(() => {
    });



module.exports = {
 Admins,Users,Clients,Entities,SubEntities,Groups,Plannings,Positions
};
