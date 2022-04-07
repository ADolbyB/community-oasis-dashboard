
export interface userPublicData {
  first_name: string,
  last_name: string,
  privilege: number
}

export interface userPrivateData {
  address: string,
  birthday: Date,
  email: string,
  gender: string,
  license_plate: string,
  phone: number
}

export interface visitorData {
  expiration_date: Date,
  first_name: string,
  last_name: string,
  license_plate: string
}
