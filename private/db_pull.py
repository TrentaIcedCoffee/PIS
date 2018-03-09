'''\
    pull all data from production database to dev database
    NOTE: use with care
'''

import os.path
import json
from pymongo import MongoClient
from red import red

PASSPORT_PATH = './passport.json'
PASSPORT_FIELDS = ['db_dev_username', 'db_dev_password',
                   'db_dev_dbname', 'db_dev_zone',
                   'db_production_username', 'db_production_password',
                   'db_production_dbname', 'db_production_zone',
                   'db_backup_username', 'db_backup_password',
                   'db_backup_dbname', 'db_backup_zone']

def pull():
    ''' pull all document from production to dev '''
    passport = fetch_passport()
    clients = connect(passport)
    clients['dev'].drop_database('test')
    dbs = {'dev': clients['dev']['test'], 'production': clients['production']['test']}
    for collection in dbs['production'].collection_names():
        cursor = dbs['production'][collection].find()
        dbs['dev'][collection].insert_many([document for document in cursor])
    print('finished pull')

def fetch_passport():
    ''' validate and fetch passport using PASSPORT_PATH and PASSPORT_FIELDS '''
    if not os.path.isfile(PASSPORT_PATH):
        print(red('ERR, {} does not exist').format(PASSPORT_PATH))
        exit(-1)

    passport_tmp = open(PASSPORT_PATH)
    passport_tmp = json.load(passport_tmp)

    for field in PASSPORT_FIELDS:
        if field not in passport_tmp:
            print(red('ERR, passport.json does not contain {}'.format(field)))
            exit(-1)

    return passport_tmp

def connect(passport):
    ''' connect dev and production db using passport '''

    def connect_one(db_username, db_password, db_dbname, db_zone):
        ''' connect db using given db info '''
        uri = 'mongodb://{}:{}@{}-00-00-{}.mongodb.net:27017,\
{}-00-01-{}.mongodb.net:27017,{}-00-02-{}.mongodb.net:27017\
/test?ssl=true&replicaSet={}-0&authSource=admin'.format(db_username, db_password,
                                                        db_dbname, db_zone,
                                                        db_dbname, db_zone,
                                                        db_dbname, db_zone,
                                                        db_dbname)
        client = MongoClient(uri)
        return client

    return {'dev': connect_one(passport['db_dev_username'],
                               passport['db_dev_password'],
                               passport['db_dev_dbname'],
                               passport['db_dev_zone']),
            'production': connect_one(passport['db_production_username'],
                                      passport['db_production_password'],
                                      passport['db_production_dbname'],
                                      passport['db_production_zone'])}

if __name__ == '__main__':
    pull()
