#!/bin/bash

echo 'REMOVE PUBLIC FILE'
rm -rf masdigi-tv/public
pwd

echo "do you want to check update package ?"

read UP

if [[ $UP == "yes" ]]
then
   echo 'UPDATE PACKAGE OF BE'
   cd ./masdigi-tv
   npm install
   cd ..
fi


if [[ $UP == "yes" ]]
then
   echo 'UPDATE PACKAGE OF FE'
   cd ./masdigi-fe
   npm install
   cd ..
fi

echo 'BUILD FE AND MOVE TO BE'
cd ./masdigi-fe
npm run build
mv ./dist ../masdigi-tv/public
cd ..

echo 'COPY GALERI'
cp -r galeri masdigi-tv/public/

echo 'BUILD APK'
cd ./masdigi-tv
npm run build
cd ..

echo 'FINISH BUILD CHECK OUTPUT FOLDER ON masidi-tv/dist'
