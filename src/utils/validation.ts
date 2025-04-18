const EMAIL_REGEX =
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|info|io|gmail|hotmail|yahoo|outlook)$/;

export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const getEmailError = (email: string): string | null => {
  if (!email) {
    return "Email is required";
  }
  if (!email.includes("@")) {
    return "Email must contain @";
  }
  if (!isValidEmail(email)) {
    return "Please enter a valid email address (e.g., user@gmail.com)";
  }
  return null;
};
