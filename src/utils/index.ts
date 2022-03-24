export const getRandomArrayItem = (array: string[]) => {
  return array[Math.ceil(array.length * Math.random()) - 1];
};

const START_COLOR = 0x303030;
export const randomColor = () => Math.floor(START_COLOR + Math.random() * (0xffffff - START_COLOR)).toString(16);
