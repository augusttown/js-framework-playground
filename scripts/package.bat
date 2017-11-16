call grunt
echo "build completed successfully"
7z a -tzip dist/js-framework-playground.zip -x!README.md -x!gruntfile.js -x!karma.config.js -x!package.json -x!package-lock.json -x!js-framework-playground.iml -x!bower.json -x!.bowerrc -x!.npmrc -x!.npmignore -x!.jshintrc -x!.gitignore -xr!.git -xr!.idea -xr!node_modules -xr!scripts -xr!unit-tests -xr!dist -xr!dist