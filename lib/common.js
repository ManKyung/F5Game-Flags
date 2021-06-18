export const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
export const getRandomNumber = (min, max) => {
  const r = Math.random() * (max - min) + min;
  return Math.floor(r);
};
