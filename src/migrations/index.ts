import * as migration_20261118_152106_initial_clinic from './20261118_152106_initial_clinic';

export const migrations = [
  {
    up: migration_20261118_152106_initial_clinic.up,
    down: migration_20261118_152106_initial_clinic.down,
    name: '20261118_152106_initial_clinic'
  },
];
