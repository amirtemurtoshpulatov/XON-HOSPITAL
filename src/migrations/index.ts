import * as migration_20261118_152106_initial_clinic from './20261118_152106_initial_clinic';
import * as migration_20261119_175235_crm_roles_comments from './20261119_175235_crm_roles_comments';

export const migrations = [
  {
    up: migration_20261118_152106_initial_clinic.up,
    down: migration_20261118_152106_initial_clinic.down,
    name: '20261118_152106_initial_clinic',
  },
  {
    up: migration_20261119_175235_crm_roles_comments.up,
    down: migration_20261119_175235_crm_roles_comments.down,
    name: '20261119_175235_crm_roles_comments'
  },
];
