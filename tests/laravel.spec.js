'use strict'

const path = require('path')
const helpers = require('yeoman-test')
const assert = require('yeoman-assert')

describe('\n Laravel 😸', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../app'))
      .withOptions({ path: './Foo' })
      .withArguments('Bar')
      .withPrompts({ framework: 'laravel' })
  })

  it('should create all files from resource Bar in folder Foo', () => {
    assert.file([
      './Foo/app/Models/Bar.php',
      './Foo/app/Services/BarService.php',
      './Foo/database/seeders/BarSeeder.php',
      './Foo/database/factories/BarFactory.php',
      './Foo/app/Repositories/BarRepository.php',
      './Foo/app/Http/Resources/BarResource.php',
      './Foo/app/Http/Requests/BarStoreRequest.php',
      './Foo/app/Http/Controllers/BarController.php',
      './Foo/app/Http/Requests/BarUpdateRequest.php',
    ])
  })
})
