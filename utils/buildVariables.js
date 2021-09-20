'use strict'

const pluralize = require('pluralize')
const camelCase = require('camelcase')

module.exports = {
  buildVariables: vars => {
    const { name } = vars
    const namePlural = pluralize(name)
    const basePath = vars.basePath || './'

    return Object.assign(
      {
        path: `${basePath}`,
      },
      {
        nameUp: name.toUpperCase(),
        namePlural: namePlural,
        nameCamel: camelCase(name),
        namePascal: camelCase(name, { pascalCase: true }),
        namePluralPascal: camelCase(namePlural, { pascalCase: true }),
        namePluralCamel: camelCase(namePlural),
      },
      vars,
    )
  },
}
