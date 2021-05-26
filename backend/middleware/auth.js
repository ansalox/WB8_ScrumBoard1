// importamos modulo jwt
const jwt = require("jsonwebtoken");

// funcion de autenticacion
const auth = (req, res, next) => {
  // declaramos el header de autorizacion para permisos de navegacion
  let jwtToken = req.header("Authorization");
  // validamos si el jwt no esta, se invalida todo acceso
  if (!jwtToken)
    return res.status(401).send("Autorizacion rechazada: No hay token");
  // separamos el payload jwt
  jwtToken = jwtToken.split(" ")[1];
  if (!jwtToken)
    return res.status(401).send("Autorizacion rechazada: No hay token");
  // validamos try catch
  try {
    // revisamos el payload
    const payload = jwt.verify(jwtToken, "secretKey");
    req.user = payload;
    next(); // procedemos al siguiente proceso
  } catch (e) {
    // si el token no es valido
    res.status(401).send("Autorizacion rechazada: Token no valido");
  }
};

// exportamos el modulo al backend
module.exports = auth;
