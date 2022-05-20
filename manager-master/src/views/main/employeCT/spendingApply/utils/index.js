export function mapDataToOptions (arr) {
  const selectOptions = [];
  arr.forEach((item) => {
    selectOptions.push({
      value: item.id,
      title: item.name,
    });
  });
  return selectOptions;
}
