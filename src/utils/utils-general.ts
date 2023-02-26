// export const getFileExtension = (filename: string) => {
//   debugger;
//   // return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
//   return filename.slice(-3);
// };

export const isXlsFile = (filename: string) => {
  return getFileExtension(filename) === "xls";
};

export const getFileExtension = (filename: string) => {
  // return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
  if (!filename.includes(".")) {
    return -1;
  }
  const lastDotIndex = filename.lastIndexOf(".");
  const length = filename.length;
  // debugger;
  if (length - lastDotIndex > 5) {
    return -1;
  }
  return (
    filename.substring(filename.lastIndexOf(".") + 1, filename.length) || -1
  );
};
