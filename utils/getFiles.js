'use strict'

const { resolve } = require('path')
const { readdir } = require('fs').promises

const pluralize = require('pluralize')

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true })
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name)
    if (dirent.isDirectory()) {
      yield* getFiles(res)
    } else {
      yield res
    }
  }
}

async function* makeFileTemplate(frameworkDirectory, name) {
  const namePlural = pluralize(name)

  for await (const f of getFiles(frameworkDirectory)) {
    const date = new Date()
    const hour = date
      .toISOString()
      .split('T')[1]
      .replace(/:/gi, '')
      .split('.')[0]
    const fullDate = date.toISOString().split('T')[0].replace(/-/gi, '_')
    const migrationName = `${fullDate}_${hour}_create_${namePlural.toLowerCase()}`

    yield {
      src: f.replace(frameworkDirectory, ''),
      dist: f
        .replace(frameworkDirectory, '')
        .replace('.txt', '')
        .replace('__name__', name)
        .replace('__name_plural__', namePlural)
        .replace('__name_low__', name.toLowerCase())
        .replace(`__migration_plural_low__`, migrationName)
        .replace('__name_plural_low__', namePlural.toLowerCase()),
    }
  }
}

module.exports = { getFiles, makeFileTemplate }
