''' backup db from db_production '''

from connect import connect

def backup():
    ''' backup all document from production to backup '''
    clients = {'production': connect('production'), 'backup': connect('backup')}
    dbs = {'production': clients['production']['test'], 'backup': clients['backup']['test']}
    for collection in dbs['production'].collection_names():
        cursor = dbs['production'][collection].find()
        dbs['backup'][collection].insert_many([document for document in cursor])
    print('finished backup')

if __name__ == '__main__':
    backup()
