[![Deploy to Cyclic](https://deploy.cyclic.app/button.svg)](https://deploy.cyclic.app/)
# Placeholder Website

Boilerplate code to create a server on Google Cloud and serve web pages to the public using a Node JS server. Quickly create a placeholder website for your domain with this.

## Deploy to Cyclic
Cyclic is a very easy way to deploy a full stack serverless app. Check it out [here](https://www.cyclic.sh/) 

## Setting up on GCP
1. Create a new project on Google Cloud https://console.cloud.google.com/
2. Install [GCloud CLI](https://cloud.google.com/sdk/docs/install-sdk), login and select the project. 
3. Run `gcloud app deploy` to deploy your application. The folder structure is setup in the simplest way to get started. This command will upload the files, install packages and run `npm start`


## Connecting Cloudflare

Add some arbitary nameservers to your domain. This can be done by adding NS records. 
eg:
| Type | Value|
| :---: | :----------:|
| NS |   joyce.ns.cloudflare.com |
| NS |   nash.ns.cloudflare.com |


Wait ~ 24 Hours for DNS propagation and then proceed with adding the website to Cloudflare with `Add a site` option in `Websites` tab of the Cloudflare Dashboard. 

## Verifying Ownership of a domain with Google
Verify your domain by adding a Property at [Google Webmaster Central](https://www.google.com/webmasters/verification/). You will have to add a TXT record. It's recommended to connect Cloudflare to avoid delays in DNS record propagation. 

## Connecting a custom domain to App Engine
Go to App Engine -> Settings -> Custom Domains and follow the steps to add a domain. [https://console.cloud.google.com/appengine/settings/domains?project=project-name](https://console.cloud.google.com/appengine/settings/domains?project=project-name)

You will have to ensure that you have verified ownership of the domain at Google Webmaster 


Connect the `www` subdmain as well. Add the given A, AAAA, and CNAME records to your domain with Cloudflare. And your App Engine will be connected to your domain

## Other
For AWS instructions see [Instructions for EC2](documentation/Instructions_for_EC2.md)

