export const validatePetName = (name: string): boolean => {
  const pattern = /^[가-힣A-Za-z0-9]*$/;

  return pattern.test(name);
};
