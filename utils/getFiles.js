"use strict";

const { resolve } = require("path");
const { readdir } = require("fs").promises;

const pluralize = require("pluralize");

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

async function* makeFileTemplate(directoryPath, name) {
  const namePlural = pluralize(name);

  for await (const f of getFiles(directoryPath)) {
    yield {
      src: f.replace(directoryPath, ""),
      dist: f
        .replace(directoryPath, "")
        .replace(".txt", "")
        .replace("__name__", name)
        .replace("__name_plural__", namePlural)
        .replace("__name_low__", name.toLowerCase())
    };
  }
}

module.exports = { getFiles, makeFileTemplate };