const fs = require("fs");
const crypto = require("crypto");

const generateRandomSecret = () => {
  return crypto.randomBytes(32).toString("hex");
};

const existingEnvPath = ".env";
const secretKeyName = "SECRET_KEY";
const refreshSecretKeyName = "REFRESH_SECRET_KEY";

// Verify that the .env file exists
if (fs.existsSync(existingEnvPath)) {

  const existingEnvContent = fs.readFileSync(existingEnvPath, "utf-8");


  if (
    existingEnvContent.includes(secretKeyName) &&
    existingEnvContent.includes(refreshSecretKeyName)
  ) {
    console.log(
      `The keys "${secretKeyName}" and "${refreshSecretKeyName}" already exist in the .env file. There is no need to generate them.`
    );
  } else {
   
    const secretKey = generateRandomSecret();
    const refreshSecretKey = generateRandomSecret();

   
    let updatedEnvContent = existingEnvContent;
    if (!existingEnvContent.includes(secretKeyName)) {
      updatedEnvContent += `\n${secretKeyName.toUpperCase()}=${secretKey}`;
    }
    if (!existingEnvContent.includes(refreshSecretKeyName)) {
      updatedEnvContent += `\n${refreshSecretKeyName.toUpperCase()}=${refreshSecretKey}`;
    }

  
    fs.writeFileSync(existingEnvPath, updatedEnvContent);

    console.log("Secrets generated and added to .env file.");
  }
} else {
  console.error(
    "The .env file does not exist. Make sure it has been created in the current directory."
  );
}
