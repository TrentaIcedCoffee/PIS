''' passport validation and preparation '''

import os.path
import json
from red import red

__all__ = ['fetch_passport']

PASSPORT_PATH = './passport.json'
PASSPORT_FIELDS = ['db_dev_username', 'db_dev_password',
                   'db_dev_dbname', 'db_dev_zone',
                   'db_production_username', 'db_production_password',
                   'db_production_dbname', 'db_production_zone',
                   'db_backup_username', 'db_backup_password',
                   'db_backup_dbname', 'db_backup_zone']

def fetch_passport():
    ''' validate and fetch passport using PASSPORT_PATH and PASSPORT_FIELDS '''
    if not os.path.isfile(PASSPORT_PATH):
        raise ValueError(red('ERR, {} does not exist').format(PASSPORT_PATH))

    passport = open(PASSPORT_PATH)
    passport = json.load(passport)

    for field in PASSPORT_FIELDS:
        if field not in passport:
            raise ValueError(red('ERR, passport.json does not contain {}'.format(field)))

    return passport

def debug():
    ''' debug by fetcing a passport '''
    fetch_passport()
    print('passport.py ok')

if __name__ == '__main__':
    debug()
