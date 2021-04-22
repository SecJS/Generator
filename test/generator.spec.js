'use strict'

const path = require('path')
const helpers = require('yeoman-test')
const assert = require('yeoman-assert')

describe('\n Single Module Architecture NestJS 😸', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../app'))
      .withOptions({ path: './Foo' })
      .withArguments('Bar')
      .withPrompts({ framework: 'nestjs' })
  })

  it('should create all files from resource Bar in folder Foo', () => {
    assert.file([
      './Foo/Bar.ts',
      './Foo/BarController.ts',
      './Foo/BarRepository.ts',
      './Foo/BarService.ts',
      './Foo/BarValidator.ts',
      './Foo/Dtos/BarDto.ts',
      './Foo/E2E/Bar/constants.ts',
      './Foo/E2E/Bar/delete.spec.ts',
      './Foo/E2E/Bar/index.spec.ts',
      './Foo/E2E/Bar/show.spec.ts',
      './Foo/E2E/Bar/store.spec.ts',
      './Foo/E2E/Bar/update.spec.ts',
    ])
  })
})
