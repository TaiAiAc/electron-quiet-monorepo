#!/usr/bin/env node

import minimist from 'minimist'

const args = minimist(process.argv.slice(2))
console.log('args: ', args)
