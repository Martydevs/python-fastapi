export const getAlignment = async (s1, s2) => {
  const response = await fetch(`/align/${s1}/${s2}`);
  return await response.text();
};

export const getEnvVariables = async () => {
  const response = await fetch("/env");
  return await response.json();
};
