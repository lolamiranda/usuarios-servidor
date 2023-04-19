
var mongoose = require("mongoose");
var Usuario = mongoose.model("usuario");
const ObjectId = require('mongodb').ObjectId;

//GET - Return all users
exports.findAllUsuario = function (req, res) {
  Usuario.find(function (err, usuario) {
    if (err) res.status(500, err.message);

    console.log("GET /usuario");
    res.status(200).jsonp(usuario);
  });
};

exports.findById = function (req, res) {
  Usuario.findById(req.params.id, function (err, usuario) {
    if (err) return res.status(500, err.message);

    console.log('GET /usuario/id/' + req.params.id);
    res.status(200).jsonp(usuario);
  });
};

//GET Return user by role(admin o cliente)
exports.findByRol = function (req, res) {
  var rol = req.params.rol;
  Usuario.find({ rol: rol }, (err, usuario) => {
    if (err) return res.status(500, err.message);
    console.log('GET /usuario/rol/' + req.params.rol);
    console.log(req.body);
    res.status(200).jsonp(usuario);
  })
}

//POST - Añadir usuarios
exports.addUsuario = function (req, res) {
  console.log("POST");
  console.log(req.body);

  var usuarioArr = req.body;

  Usuario.insertMany(usuarioArr, function (err, usuario) {
    if (err) return res.status(500).send(err.message);
    res.status(200).jsonp(usuario);
  });
};



//DELETE - Eliminar usuarios

exports.deleteUsuario = async function (req, res) {
  try {
    let id = req.params.id;
    let result = await Usuario.deleteOne({ _id: id })
    if (result) {
      console.log('DELETE /usuario/' + req.params.id);
      return res.status(200).send({ result: "User has been deleted" });
    }
    return res.status(200).send({ result: "Not able to delete" })
  } catch (error) {
    return res.status(200).send({ message: error.message })
  }

}