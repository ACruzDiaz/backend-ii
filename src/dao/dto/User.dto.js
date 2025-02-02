export default class UserDTO{

  constructor(user){
    this.first_name = this.validate_name(user.first_name)
    this.last_name = this.validate_name(user.last_name)
    this.email = this.validate_email(user.email)
    this.password = this.validate_password(user.password)
    this.age = this.validate_age(user.age)
    this.cartId = user.cartId
    this.role = user.role
  }

  validate_name(name){
    if(typeof name !== 'string' || name.length <= 0)
      throw new Error("Nombre no valido")

    return name
  }

  validate_email(email){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(typeof email !== 'string' || email.length <= 0 || !emailRegex.test(email))
      throw new Error("El correo no es valido")

    return email
  }

  validate_password(password){
    if(typeof password !== 'string' || password.length <= 8 )
      throw new Error("La contraseña no es valida")

    return password
  }

  validate_age(age){
    try{
      const parsedAge = parseInt(age)
      if(!parsedAge || parsedAge % 1 > 0)
        throw new Error("Edad invalida");
      return age
    }catch(error){
      throw new Error(error.message)
    }
  }

  
}