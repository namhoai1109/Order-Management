type TSignInResponse = {
  token: string;
  role: string;
  username: string;
};

type TFormSignUpCustomer = {
  name: string;
  address: string;
  phone: string;
  email: string;
  username: string;
  password: string;
};

type TFormSignUpShipper = {
  username: string;
  password: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  licensePlate: string;
  nationalId: string;
  bankAccount: string;
  districtId: int;
};

type TFormSignUpPartner = {
  username: string;
  password: string;
  representative: string;
  email: string;
  phone: string;
  brandName: string;
  bankAccount: string;
  culinaryStyle: string;
  taxCode: string;
  branches: OBJECT_TYPE.TBranch[];
};
