const bcrypt = require("bcrypt");
const UserRepo = require("./users.repository")
const apiKeyGen = require("../../shared/utils/apiKeyGenerator")

exports.registration = async ({email, password}) => {
    const existingUser = await UserRepo.findByEmail(email);
    
    if(existingUser) {
        throw new Error(`The user with the email ${email} already exists`);
    };

    const passwordHash = await bcrypt.hash(password, process.env.SALT_ROUNDS);
    const apiKey = apiKeyGen.apiKeyGenerator;

    const user = await UserRepo.createUser({
        email,
        password_hash: passwordHash,
        api_key: apiKey
    })

    return user;
}