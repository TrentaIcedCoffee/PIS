# PICS - UC Davis Department Contact
This is a training guide for staff to learn how to use the UC Davis Department Contact website. If you are a SISS administrator of the website, click [here](https://github.com/TrentaIcedCoffee/PICS#administrator-guide).

## Sign up
To sign up a new account, please go to the [website](http://192.241.218.9/welcome.html). Complete the form to create your account.
- You can use the search box to find your department(s) and type(s) of visa requests you process.
![search_box](https://github.com/TrentaIcedCoffee/PICS/blob/master/readme_resource/search_box.JPG)
- End date (select an end date that your information is valid through).
![end_date](https://github.com/TrentaIcedCoffee/PICS/blob/master/readme_resource/end_date.JPG)  

## Login
To login, click login.    
![login](https://github.com/TrentaIcedCoffee/PICS/blob/master/readme_resource/login.JPG)

## Update My Information
After you login to UC Davis Department Contact, you can update any information for your profile by going to My Information.    
![change](https://github.com/TrentaIcedCoffee/PICS/blob/master/readme_resource/change.JPG)    
- In order to edit information, you must first click on the lock button to unlock the field.    
![unlock](https://github.com/TrentaIcedCoffee/PICS/blob/master/readme_resource/unlock.JPG)    
- After making a change, click on the lock button again to turn off editing.    
![lock](https://github.com/TrentaIcedCoffee/PICS/blob/master/readme_resource/lock.JPG)     

## Search and Query
### Global Search
You can type keywords in Global search, and it will display all information related to keywords.    
![search](https://github.com/TrentaIcedCoffee/PICS/blob/master/readme_resource/search.JPG)
### Column Specific Query
You can type keywords into the query box of each column, and it will filter information related to keywords you enter.    
![query](https://github.com/TrentaIcedCoffee/PICS/blob/master/readme_resource/query.JPG)

#### Any questions? Please send an email to sissdata@ucdavis.edu

## Administrator Reference Tools

### Database
Mongo 3.4.10    


url (shell 3.4 or earlier)    

    mongo "mongodb://siss-shard-00-00-aoiln.mongodb.net:27017,siss-shard-00-01-aoiln.mongodb.net:27017,siss-shard-00-02-aoiln.mongodb.net:27017/test?replicaSet=siss-shard-0" --ssl --authenticationDatabase admin --username sissdata --password <PASSWORD>

url (shell 3.6 or later)

    mongo "mongodb+srv://siss-aoiln.mongodb.net/test" --authenticationDatabase admin --username sissdata --password <PASSWORD>

### API
[api_data.json](https://raw.githubusercontent.com/TrentaIcedCoffee/PICS/master/api_data.json)
