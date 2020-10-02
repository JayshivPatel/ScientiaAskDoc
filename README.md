# Scientia Project

> Scientia project - A central hub for the EdTech services that are focused on enhancing the remote learning experience for students and faculty alike.

_🚧 This platform is currently under development! 🚧_

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

First, run `yarn install` to install the node modules used for the frontend.

In order for the API links to work, the following repository branches need to be cloned and run separately:

### 1. materials@scientia-integration

```shell
# Clone the repository and checkout to the relevant branch
git clone https://gitlab.doc.ic.ac.uk/edtech/materials.git
git checkout scientia-integration

# Setup and run the development server on port 5000
python3 -m venv venv
./scripts/start_scientia_dev.sh
```

### 2. scientia-calendar

```shell
# Clone the repository
git clone https://gitlab.doc.ic.ac.uk/zd419/scientia-calendar.git

# Setup and run the server on port 4000
npm install -g nodemon
npm install
nodemon index.js
```

### 3. Gather past paper data

The jsons containing past exam papers exists in `public/jsons`, but the information might be outdated when you're running the project. To refresh the data:

1. Delete `20XX-20XX.json` and `folders.json` from `public/jsons`.
2. Open [https://exams.doc.ic.ac.uk/](https://exams.doc.ic.ac.uk/).
3. Copy `scripts/pastpapers.js` into the browser console, and press enter to run.
4. Remember to enable multiple file download for the site.
5. Copy the downloaded jsons back to `public/jsons`.
6. Profit.

## To run frontend

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
