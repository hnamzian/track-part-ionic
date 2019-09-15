export interface Part {
  id: string;
  serialNumber: string;
  name: string;
  type: PartType;
  creatorId: string;
  testerId: string;
  ownerId: string;
  state: PartState;
  createdAt: string;
}

export enum PartType {
  Board = 'BOARD',
  Rak = 'RAK',
  PC = 'PC',
  Antenna = 'ANTENNA',
  System = 'SYSTEM'
}

export enum PartState {
  created = 'CREATED',
  testPassed = 'TESTPASSED',
  testRejected = 'TESTREJECTED',
  tested = 'TESTED'
}
