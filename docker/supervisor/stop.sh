#!/usr/bin/env sh

printf "READY\n";

while read line
do
  echo "[eventlistener] Processing Event: ${line}" >&2;

  echo "[eventlistener] Send SIGTERM to supervisord, and wait 5 sec..." >&2;
  kill -15 $(cat "/var/run/supervisord.pid")
  sleep 5

  echo "[eventlistener] Send SIGKILL to supervisord..." >&2;
  kill -9 $(cat "/var/run/supervisord.pid")
done < /dev/stdin
