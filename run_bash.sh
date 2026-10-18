#!/bin/bash
export PATH=$PATH:/usr/local/bin:/usr/bin:/bin:~/.nvm/versions/node/$(ls ~/.nvm/versions/node 2>/dev/null | tail -n 1)/bin
exec npx -y @modelcontextprotocol/server-bash
