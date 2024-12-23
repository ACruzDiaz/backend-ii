import passport from 'passport';
import dotenv from 'dotenv';
import jwt from 'passport-jwt'

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJWT
dotenv.config();


const cookieExtractor = (req) =>  {
    let token = null;
    if(req && req.cookies){
        token = req.cookies['currentUser'];
    }
    return token;
}

const initializePassport = () => {
    passport.use('jwt', new JWTStrategy({
        // jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
        // jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        jwtFromRequest: cookieExtractor,
        secretOrKey: process.env.PRIVATE_KEY_JWT || 'CoderKeyComoUnSecret'
    }, async(jwt_payload, done) => {
        try{
            return done(null, jwt_payload);
        } catch(error){
            done(error)
        }
    }
))

};


export default initializePassport;