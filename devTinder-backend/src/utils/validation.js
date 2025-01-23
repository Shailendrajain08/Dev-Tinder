const validator = require("validator");

const ValidateSignUpData = (req) => {
  // , age, gender, photoUrl, about, skills
  const { firstName, lastName, emailId, password } = req.body;
  console.log("firstName", firstName);
  console.log("lastName", lastName);
  console.log("emailId", emailId);
  console.log("password", password);
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

const validateMyProfileEditData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) => 
    allowedEditFields.includes(field));

  return isEditAllowed;
};

module.exports = {
  ValidateSignUpData,
  validateMyProfileEditData
};
