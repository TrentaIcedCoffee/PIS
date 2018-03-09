'''\
    pull all data from production database to dev database
    NOTE: use with care
'''

from connect import connect

def pull():
    ''' pull all document from production to dev '''
    clients = {'dev': connect('dev'), 'production': connect('production')}
    clients['dev'].drop_database('test')
    dbs = {'dev': clients['dev']['test'], 'production': clients['production']['test']}
    for collection in dbs['production'].collection_names():
        cursor = dbs['production'][collection].find()
        dbs['dev'][collection].insert_many([document for document in cursor])
    print('finished pull')

if __name__ == '__main__':
    pull()
