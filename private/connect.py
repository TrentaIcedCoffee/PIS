''' connect dbs using passport.json '''

from pymongo import MongoClient
from passport import fetch_passport

__all__ = ['connect']

def connect(kind):
    ''' connect db in certain kink using passport '''
    if kind != 'dev' and kind != 'production' and kind != 'backup':
        raise ValueError('invalid kind, has {}'.format(kind))

    passport = fetch_passport()

    def connect_one(db_username, db_password, db_dbname, db_zone):
        ''' connect db using given db info '''
        uri = 'mongodb://{0}:{1}@{2}-00-00-{3}.mongodb.net:27017,\
{2}-00-01-{3}.mongodb.net:27017,{2}-00-02-{3}.mongodb.net:27017\
/test?ssl=true&replicaSet={2}-0&authSource=admin'.format(db_username, db_password,
                                                         db_dbname, db_zone)
        client = MongoClient(uri)
        return client

    return connect_one(passport['db_{}_username'.format(kind)],
                       passport['db_{}_password'.format(kind)],
                       passport['db_{}_dbname'.format(kind)],
                       passport['db_{}_zone'.format(kind)])

def debug():
    ''' debug modulo by connecting all dbs '''
    for kind in ['dev', 'production', 'backup']:
        client = connect(kind)
        print('db_{} connected'.format(kind))
        print('dbs:', [db for db in client.database_names()])
    print('connect.py ok')

if __name__ == '__main__':
    debug()
