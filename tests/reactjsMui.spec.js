'use strict'

const path = require('path')
const helpers = require('yeoman-test')
const assert = require('yeoman-assert')

describe('\n ReactJS 😸', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../app'))
      .withOptions({ path: './Foo' })
      .withArguments('Bar')
      .withPrompts({ framework: 'reactjsMui' })
  })

  it('should create all files from resource Bar in folder Foo', () => {
    assert.file([
      './Foo/components/Bar/component.tsx',
      './Foo/components/Bar/index.tsx',
    ])
  })
})
