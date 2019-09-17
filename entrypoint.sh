#!/bin/bash

 n=0
   until [ $n -ge 5 ]
   do
      npx sequelize-cli db:migrate && break 
      n=$[$n+1]
      sleep 5
   done
npm run dev