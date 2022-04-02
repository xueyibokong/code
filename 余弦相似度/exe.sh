#!/bin/sh

if [ $# != 4 ]
then
	echo "Usage: "  $0  " inputfile outputfile timefile tempdir"
	exit 1
fi

BASE=$(cd `dirname $0`;pwd)

cd ${BASE}

rm -rf exe_result

echo "status:running" >> coder_info

node ./main.js $1 $2 $3 $4 > exe_result 2>&1

