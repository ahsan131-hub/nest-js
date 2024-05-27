export interface Organization {
  firstName: string;
  lastName: string;
  email: string;
  description: string;
  openAiKey: string;
  contactPerson: {
    contactFirstName: string;
    contactLastName: string;
    contactPassword: string;
    contactEmail: string;
    contactAddress: string;
  };
}

export interface ICreateUser {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  address: string;
  organization?: Organization;
}

export interface IUser {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  address: string;
  organization?: Organization;
}
