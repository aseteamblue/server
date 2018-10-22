# Server API app for Team BLUE


## Push on Heroku

Install heroku-cli
```
npm install -g heroku
```
Then you need to login :
```
heroku login
username: aseteamblue@gmail.com
password: emf12318$
```
And finally, connect your git repository to heroku:
```
cd yourserverrepo
heroku git:remote -a server-thingy
```
And when you want to push to heroku:
```
git push heroku master
or to use dev branch :
git push heroku dev:master
```
