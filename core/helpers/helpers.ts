// converts the time to format 0:00
export const getTime = (time: number) =>
  `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

export const replaceImgUrl = (inputUrl: string) => {
  return inputUrl.replace(/{w}x{h}bb.jpg$/, "400x400.jpg");
};
