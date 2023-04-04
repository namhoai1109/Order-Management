export const getProvinces = (locations: OBJECT_TYPE.TProvince[]) => {
  if (locations.length === 0) return [];
  return locations.map((item) => {
    return {
      label: item.label,
      value: item.value,
    };
  });
};

export const getDistricts = (province: string, listProvinces: OBJECT_TYPE.TProvince[]) => {
  if (listProvinces.length === 0) return [];
  const provinceSelected = listProvinces.find((item) => item.value === province);
  return provinceSelected?.districts.map((district) => {
    return {
      label: district.label,
      value: district.value,
    };
  });
};

export const getProvinceName = (provinces: OBJECT_TYPE.TProvince[], value: string) => {
  const province = provinces.find((item) => item.value === value);
  return province?.label;
};

export const getDistrictsName = (districts: OBJECT_TYPE.TDistrict[], value: string) => {
  const district = districts.find((item) => item.value === value);
  return district?.label;
};
