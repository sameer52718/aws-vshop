export function getExtension(filename) {
  return filename.split(".").pop();
}

export const optimisticUpdateFollow = (url, newFollowState, data) => {
  let updatedData = JSON.parse(JSON.stringify(data));
  const itemIndex = data.findIndex((item) => item.url === url);
  if (itemIndex !== -1) {
    updatedData[itemIndex].follow = newFollowState;
  }
  return updatedData;
};

export function removeUnderscoreAndCapitalize(str) {
  let formattedStr = str.replace(/_/g, " ");

  formattedStr = formattedStr.replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });

  return formattedStr;
}
