const validator = require('validator')

const ValidateSignUpData = (req) => {
    // , age, gender, photoUrl, about, skills
    const {firstName, lastName, emailId, password} = req.body
console.log("firstName", firstName)
console.log("lastName", lastName)
console.log("emailId", emailId)
console.log("password", password)
    if(!firstName || !lastName) {
        throw new Error("Name is not valid");
    }else if (validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password");
    }
};

module.exports = {
    ValidateSignUpData
}