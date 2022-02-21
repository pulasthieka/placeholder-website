# Instructions for setting up a webserver in an EC2

## SSH Connection
Refer https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html
```bash
ssh -i "~/Downloads/aws_webserver.pem" ubuntu@ec2-3-83-163-243.compute-1.amazonaws.com
```

## Install NodeJS
sudo snap install node --classic

### Transferring files
In the event that git is not installed. Use wormhole.
`sudo snap install wormhole`

> **Important** wormhole is named magic-wormhole in mac. You have to install in your local machine to upload the files

`wormhole receive <received code>` 
## Install packages
```bash
cd react-express-project
npm i
cd client
npm i
npm run build
```
Set up Nginx. 
```bash
sudo apt install nginx
sudo service nginx start
sudo service nginx status

sudo nano /etc/nginx/sites-available/default
sudo systemctl restart nginx
```
### Nginx server configuration 
Refer https://www.nginx.com/resources/wiki/start/topics/examples/full/
 `/etc/nginx/sites-available/default` file
 ```text
server {

        index index.html index.htm index.nginx-debian.html;
        server_name example.com www.example.com;

        location / {
				proxy_pass http://localhost:5000;
                proxy_buffering         on;

        }

}
```
## Run Server
Refer https://www.dev2qa.com/how-to-run-node-js-server-in-background/
```bash
nohup node server.js  > output.log & disown
```

## Installing MongoDB
Refer https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

```bash
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl status mongod
```


### Setup authentication (optional)
Refer
- https://docs.mongodb.com/manual/tutorial/configure-scram-client-authentication/
- https://docs.mongodb.com/manual/reference/connection-string/

`mongosh` 
```mongosh
use admin
db.createUser(
  {
    user: "myUserAdmin",
    pwd: "myPassword", // or cleartext password
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)
db.adminCommand( { shutdown: 1 } )
```
Exit mongosh with `Crtl+ C`
```bash
sudo nano /etc/mongod.conf
# add the following lines ###########
security
  authentication: enabled
#####################################
sudo systemctl restart mongod

# how to connect after enabling auth
mongosh --port 27017 --authenticationDatabase "admin" -u "myUserAdmin" -p "myPassword"
# change mongodb URL in the server config too
```

In case of errors try the following
```bash
sudo chown -R mongodb:mongodb /var/lib/mongodb
sudo chown mongodb:mongodb /tmp/mongodb-27017.sock
sudo service mongod restart
sudo systemctl status mongod
```

## Additional Resources
https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/
https://medium.com/idomongodb/how-to-npm-run-start-at-the-background-%EF%B8%8F-64ddda7c1f1
https://medium.com/geekculture/deploying-a-react-app-and-a-node-js-server-on-a-single-machine-with-pm2-and-nginx-15f17251ee74
https://keithweaverca.medium.com/setting-up-mern-stack-on-aws-ec2-6dc599be4737
https://unix.stackexchange.com/questions/420594/why-process-killed-with-nohup