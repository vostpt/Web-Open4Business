# Open4Business Web Client
Open4Business is a crowdsourced information system for business started during during the COVID19 pandemic in Portugal.

Open4Business Web Client is one of the visual interfaces with the platform.

# The Project
Build a crowdsourced website (followed by an app) where users can check if a certain business is open What are the opening hours and what are the diverse timetables for specific groups What kind of service is provided

# Priority
This is a critical priority project. All resources should be focused on this, apart from the team that is developing the app for covid19estamoson.gov.pt


## Installation

### Environment variables
Create a new file "environment.js" file in "src" directory with the content below. Atention: this is a JS file, not TS!
```
window.__env = {
  baseHref: '',
  apiUrl: 'http://api.domain.io',
  logLevel: 'TRACE'
};
```

### Run the following commands:
``` 
$ npm install
```

## Running the app
### Development mode
``` 
npm run start:dev
```

### Production mode
``` 
npm run build
npm start:prod
```

### Build
```
docker build --target publishStage --tag vostpt/open4business-web-client:latest .
```

### Publish
```
echo "PASS" | docker login --username USER --password-stdin docker.io
docker push vostpt/open4business-web-client:latest
```
