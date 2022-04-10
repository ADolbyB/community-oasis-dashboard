# Community Oasis Dashboard

A web app for CEN 4010 class project.

Authors: Hakeem Johnson, Joshua Lavieri, Michael Mesquita, Sam Chowdhury, and (in memoriam) Joel Brigida.

## Status

[![[main: CI Status]](https://github.com/Midlight25/community-oasis-dashboard/actions/workflows/project-ci.yml/badge.svg?branch=main&event=push)](https://github.com/Midlight25/community-oasis-dashboard/actions/workflows/project-ci.yml)
[![CodeQL](https://github.com/Midlight25/community-oasis-dashboard/actions/workflows/codeql-push.yml/badge.svg?branch=main)](https://github.com/Midlight25/community-oasis-dashboard/actions/workflows/codeql-push.yml)
[![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-1f425f.svg)](https://www.javascript.com)

## How to set-up dev environment

- Install the dependencies, `npm install`
- Because the firebase configuration files are all setup, all you have to do is install the firebase emulators, `firebase init emulators`. The default choices are perfect as is. You will install the:
  - Authentication Emulator
  - Functions Emulator
  - Firestore Emulator
  - Hosting Emulator
  - Pub/sub Emulator

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

### Build Project

```bash
npm run build
```

Build the project for release, webapp and functions files are built and ready for deployment.

```bash
npm run build:{webapp|functions}
```

Build the specified portion of the project for deployment.

```bash
npm run start
```

Build the project and serve on the local emulators. Hot-reloading is not available.

```bash
npm run clean
```

Clean the project of the build artifacts and debug logs.

```bash
npm run clean:{debug|parcel}
```

Remove either the build artifacts or the debug logs from the project directory.

```bash
npm run check
```

Run the type checking scripts on the typescript portions of the project. The Cloud Functions are not included in this check.

```bash
npm run lint
```

Run the linter to check for possible errors in the files. Check for best programming practices and proper formatting.

```bash
npm run fix
```

Force fix the errors found by the linter including formatting errors.
