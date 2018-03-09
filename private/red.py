''' output red string on window '''

import colorama

__all__ = ['red']

colorama.init()
RED_START = '\033[1;31m'
RED_END = '\033[0;0m'

def red(string):
    ''' return string in redforeground '''
    return '{}{}{}'.format(RED_START, string, RED_END)

def debug():
    ''' debug '''
    print(red('WARNING'))

if __name__ == '__main__':
    debug()
