# community-oasis-dashboard

Web app for CEN 4010 class project

## Scripts

These are the available scripts for development.

### Start Emulation Environment

```npm
npm run start
```

Builds the whole project: web application and serverless functions; then starts the firebase emulators with the newly built content. This command does not support hot reload for the web app and therefore is unsuitable for anything other than previewing the full functionality of the app. Beware that it also takes a while to start.

### Start Development Environment

```bash
npm run dev
```

Builds the web application with Parcel and serves it on the development server. Hot reloading is enabled. Cloud functions and emulators are not started with this command, and so that functionality will not be available in the web application. The webapp is not linted or type-checked.

```bash
npm run serve
```

Starts the available firebase emulators without building the project.

```bash
npm run serve:functions
```

Starts the Cloud Functions Firebase emulator. Runs npm subscript in `functions/` subdirectory, please check out that `package.json` in that subdirectory for more further details.
