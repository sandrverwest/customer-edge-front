export interface Credential {
  email: string
  password: string
}

export interface Token {
  token: string
}

export interface User {
  _id: string
  customerId: String
  firstName: string
  lastName: string
  username: String
  email: string
  phone?: string
  extension?: string
  photo?: string
  department?: string
  position?: string
  isDeactivated?: boolean
}

export interface ChangesItem {
  name: string | null
  type: string | null
  unit: string | null
  vin: string | null
  year: string | null
  make: string | null
  ntl: boolean | null
  leasedTo: string | null
  notes: string | null
  requestedBy: string | null
}

export interface Adds extends ChangesItem {
  value: string | null
  addressLine: string | null
  lossPayee: string | null
}

export interface Removals extends ChangesItem {
  pd: boolean | null
}

export interface levelGuideline {
  _id: string
  level: string
  driverEligibility: []
  unacceptableDrivingRecords: []
  requiredQuote: boolean
  documentsForQuote: []
  clearance: string
}

export interface Agents {
  _id: string
  name: string
  email: string
}
export interface Producer {
  _id: string
  name: string
  coiRequests: string
  agents: Agents[]
}

export interface Coverage {
  coverageLineName: string
  coverageLineCarrier: string
  coverageLineExpirationDate: Date
  coverageLinePolicyNumber: string
}
export interface Coverages extends Producer{
  _id: string
  producerID: string
  carrierID: string
  coverageLines: [Coverage]
  isPrimary: boolean
  primaryPolicyType: String
  notes: string
}

export interface Address {
  addressLine: string
  city: string
  state: string
  zip: string
}

export interface Carrier {
  isExists?: boolean
  _id: string | null
  name: string
  usdot: number | null
  mc: number | null
  level?: string
  photo?: string | null
  phone?: string
  fax?: string
  address?: Address
  divisions?: string[]
  operations?: string[]
  insuranceRates?: InsuranceRates
}

export interface CarrierFormsData {
  name: string
  photo?: string
  address?: Address
}

export interface Unit {
  unit: string | null
  vin: string | null
  year: string | null
  make: string | null
  value: string | null
  remove_pd: string | null
  remove_ntl?: string | null
  remove_cl: string | null
}
export interface Forms {
  ownerName: string | null
  additionalDriver: string | null

  truck: Unit

  trailer: Unit
}

export interface InsuranceRates {
  basePackage: number
  pdRate: number
  teamDriverPremium: number
}

export interface InsurancePremiums{
  basePackage: number
  truckPremium: number
  trailerPremium: number
  teamDriverPremium: number
  weeklyTotal: number
}

export interface Equipment {
  _id: string
  ssn_ein: string
  equipmentType: string
  ownershipType: string
  unitNumber: string
  vin: string
  year: number
  make: string
  value: number
  cl: string
  pd: string
  ntl: string
  status: string
}

export interface Contractor {
  _id: string
  cid: string
  businessName?: string
  firstName: string
  middleName?: string
  lastName: string
  ssn_ein: string
  phone?: string
  email?: string
  address?: string
  city?: string
  state?: string
  zip?: string
  status: string
}
