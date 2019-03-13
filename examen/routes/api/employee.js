var express = require('express');
var router = express.Router();

function initEmployee(db) {
  var empModel = require('./employeeModel')(db);

  //rutas a implementar
  // metodo     ruta                     body
  /*
      GET       /all
      GET       /byid/:id
      GET       /bycompany/:company
      GET       /byagerange/:min/:max
      GET       /bytag/:tag
      POST      /addtag/:id              tag
      DELETE    /delete/:id
      POST      /makeolder               age
   */
  var emps = {
    'name':'',
    'email':null,
    'company':'',
    'age':null
  };
  router.get('/all', (req, res, next) => {
    
    mongoModel.getEmployees(
      function(err, docs){
        if(err) {
          console.log(err);
          return res.status(500).json({error:"Error"});
        }
        return res.status(200).json(docs);
      }

    
    /*
    empModel.xyz( (err, docs)=>{
      return res.status(200).json(docs);
    });
    */
  );// all
});
  

router.get('/byid/:empid', (req, res, next)=>{
  mongoModel.getEmployeesById(req.params.empid, (err, empDoc)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"Error al obtener el empleado"});
    }
    return res.status(200).json(empDoc);
  } );
}); 

router.get('/bycompany/:company', (req, res, next)=>{
  mongoModel.getEmployeesByCompany(req.params.empname, req.params.empemail, req.params.empcompany, (err, empDoc)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"Error al obtener el empleado"});
    }
    return res.status(200).json(empDoc);
  } );
}); 

router.get('/bytags/:tag', (req, res, next)=>{
  mongoModel.getEmployeesByTag((req.params.tag || '').split('_'), (err, docs)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"No se encontro el empleado"});
    }else{
      return res.status(200).json(docs);
    }
  } );
});

router.put('/addtags/:id', (req, res, next)=>{
  mongoModel.addEmployeeATag((req.body.tags || '').split('|'), req.params.id, (err, rsult)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"No se puede actualizar el empleado"});
    }
    return res.status(200).json(rsult);
  });// end addTagsToThing
});// addtags


router.delete('/delete/:thingId', function(req, res, next){
  var _empId = req.params.empid;
  mongoModel.removeEmployee(_empId, (err, result)=>{
    if(err){
      return res.status(500).json({"error":"No se pudo eliminar el empleado"});
    }
    return res.status(200).json(result);
  }); 
});



  return router;
}

module.exports = initEmployee;
