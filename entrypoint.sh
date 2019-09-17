#!/bin/bash

 n=0
   until [ $n -ge 5 ]
   do
      npx sequelize db:migrate && break  # substitute your command here
      n=$[$n+1]
      sleep 5
   done
npm run dev