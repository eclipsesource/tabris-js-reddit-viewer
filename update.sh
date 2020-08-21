rm -rf ./node_modules/tabris
rm -rf ./node_modules/tabris-decorators
cp -r ../tabris-js-3/build/tabris ./node_modules
mkdir ./node_modules/tabris-decorators
cp ../tabris-decorators-3/dist/* ./node_modules/tabris-decorators
