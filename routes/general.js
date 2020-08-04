var express = require('express');
var router = express.Router();
const { Clients,Users,Groups ,Entities,SubEntities,Plannings,Positions,Responsible} = require('../sequelize');

router.get('/', function(req, res, next) {
    res.send('index');
});


router.post("/save", async function(req,res,next){
    var positions = JSON.parse(req.body.positions);
   for(let i =0 ; i<positions.data.length;i++) {

        var exist = await Positions.findOne({where:{subEntityId:positions.data[i].id,planningId: positions.id_planning }})
       if(exist) {
           // update time and day
           exist.update({
               day:positions.data[i].day,
               start:positions.data[i].start.hour +":"+positions.data[i].start.min,
               end:positions.data[i].end.hour +":"+positions.data[i].end.min,
           })
       }
      else {
           await Positions.create({
               day:positions.data[i].day,
               start:positions.data[i].start.hour +":"+positions.data[i].start.min,
               end:positions.data[i].end.hour +":"+positions.data[i].end.min,
               planningId:positions.id_planning,
               subEntityId: positions.data[i].id
           }).catch(function (err) {
               res.status(400).send();
           });
       }
      }

    res.status(200).send();

});

module.exports = router;
