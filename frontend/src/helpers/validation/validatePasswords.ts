export const validatePasswords = (password: string, confirmPassword: string): undefined | never => {
  if (!password && !confirmPassword) return;
  if (password !== confirmPassword) throw Error('Passwords do not match');
}
