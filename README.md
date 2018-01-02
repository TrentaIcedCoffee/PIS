# PICS - UC Davis Department Contact
This is a training guide for staff to learn how to use the UC Davis Department Contact website. If you are an administrator of the website, click [here](TODO).

### Sign up
If you need a new account, please go to the [website](TODO), and fill in all your record, then it will give a new account associated with your record.

> - You can only have one account with one email
> - You can use search box when choosing departments and visas
> ![search_box](TODO)
> - End Date indicates that you consider your record is valid at least before the date
> ![end_date](TODO)  

### Login
click blue "login" link to login page
![login](TODO)

### Change Record
After you login to website, you can open My Information, click blue lock button, unlock your information, change it, and lock it back
![change](TODO)

### Search and Query
You can type keywords on in Global search, and it will filter all information related to keywords.
![search](TODO)
You can type keywords into search box of each column, and it will filter information related to keywords in that specific field.

#### Any further problems? Please send an email to (TODO)

## Administrator Guide

### Database
Mongo 3.4.10    


url (shell 3.4 or earlier)    

    mongo "mongodb://siss-shard-00-00-aoiln.mongodb.net:27017,siss-shard-00-01-aoiln.mongodb.net:27017,siss-shard-00-02-aoiln.mongodb.net:27017/test?replicaSet=siss-shard-0" --ssl --authenticationDatabase admin --username sissdata --password <PASSWORD>

url (shell 3.6 or later)

    mongo "mongodb+srv://siss-aoiln.mongodb.net/test" --authenticationDatabase admin --username sissdata --password <PASSWORD>

### API
[api_data.json](TODO)
