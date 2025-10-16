import bcrypt from "bcrypt";

/**
 * Hashar ett lösenord med bcrypt.
 * @param password Lösenord som ska hash
 * @param saltRounds Antal salt-rounds (standard 10)
 * @returns hashat lösenord
 */
export async function hashPassword(password: string, saltRounds = 10): Promise<string> {
  if (!password) throw new Error("Password is required");
  return await bcrypt.hash(password, saltRounds);
}
