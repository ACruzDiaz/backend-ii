import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import passport from 'passport';


dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY_JWT || 'CoderKeyComoUnSecret';
const EXPIRES_TIME_TOKEN = process.env.EXPIRES_TIME_TOKEN || '24h';


//Crear una constante llamada createHash
//Es una función que recibe un password como argumento y genera:
//   * Genera un salt (una cadena aleatoria de 10 caracteres) 
//   * Genera el hash del password usando el salt
//   * Devuelve el hash del password 
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Crea una constante llamada isValidPassword
// La constante es una función que recibe un objeto user y un password como argumentos
// Compara el password con el password hasheado almacenado en el objeto user
// Devuelve true si el password coincide con el password hasheado, false en caso contrario
export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
}

/**
 * generateToken: al utilizar jwt.sign:
 *  El primer argumento es un objeto con la información
 *  El segundo argumento es la llave privada con la cual se realizará el cifrado
 *  El tercer argumento es el tiempo de expiración del token.
 */
export const generateToken = (user) => {
    const token = jwt.sign(user, PRIVATE_KEY, { expiresIn: EXPIRES_TIME_TOKEN });
    return token;
};


export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function(err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res.status(401).send({ error: info.messages ? info.messages : info.toString() });
      }
      req.user = user.user;

      next();
    })(req, res, next);
  };
};


export const authorization = (role) => {
  return async (req, res, next) => {
      if(!req.user) return res.status(401).send({ message: 'Unauthorized' });
      if(req.user.role != role) return res.status(403).send({ error: "No permissions" });
      next();
  }
};
