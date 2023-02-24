export const getFileExtension = (filename: string) => {
  debugger;
  // return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  return filename.slice(-3);
};

export const isXlsFile = (filename: string) => {
  return getFileExtension(filename) === "xls";
};
