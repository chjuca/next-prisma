import bcrypt from "bcrypt";

export async function verifyPassword(storedPassword, enteredPassword) {
    const isValid = await bcrypt.compare(storedPassword, enteredPassword);
    return isValid;
}


export async function hashPassword(password) {
    const hashedPassword = bcrypt.hash(password, 10)
    return hashedPassword;
}