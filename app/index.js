'use strict'

const path = require('path')
const chalk = require('chalk')
const yosay = require('yosay')
const Generator = require('yeoman-generator')

const { makeFileTemplate } = require('../utils/getFiles')
const { buildVariables } = require('../utils/buildVariables')

class SecGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.argument('name', {
      type: String,
      required: true,
      description: 'Resource name single',
    })

    this.option('path', {
      alias: 'p',
      type: String,
      required: false,
      default: '.',
      description: 'Path where is going to be generated the files',
    })
  }

  async Prompting() {
    this.log(yosay(`Welcome to ${chalk.greenBright('SecJS')} generator!`))

    this.variables = buildVariables({
      name: this.options.name,
      basePath: this.options.path,
    })

    this.answers = await this.prompt([
      {
        type: 'list',
        name: 'framework',
        message: 'Select your framework:',
        choices: [
          { name: 'Laravel', value: 'laravel' },
          { name: 'NestJS TypeORM', value: 'nestjsTypeOrm' },
          { name: 'NestJS Mongoose', value: 'nestjsMongoose' },
          { name: 'NestJS PrismaORM', value: 'nestjsPrismaOrm' },
          { name: 'ReactJS', value: 'reactjs' },
        ],
      },
      {
        when: answers => answers.framework === 'reactjs',
        type: 'list',
        name: 'reactjs',
        message: 'Select your component type:',
        choices: [
          { name: 'ReactJS Component', value: 'reactjsComponent' },
          { name: 'ReactJS Material-UI', value: 'reactjsMui' },
          { name: 'ReactJS StyledComponents', value: 'reactjsStyled' },
          { name: 'ReactJS ContextAPI', value: 'reactjsContext' },
          { name: 'ReactJS Hook', value: 'reactjsHook' },
        ],
      },
    ])
  }

  frameworkChoice(framework) {
    switch (framework) {
      case 'reactjs':
        return this.answers.reactjs
      default:
        return this.answers.framework
    }
  }

  async writing() {
    const framework = this.frameworkChoice(this.answers.framework)
    const dir = path.join(__dirname, `templates/${framework}/`)

    for await (const f of makeFileTemplate(dir, this.variables.name)) {
      this.fs.copyTpl(
        this.templatePath(`${framework}/${f.src}`),
        this.destinationPath(`${this.variables.path}/${f.dist}`),
        this.variables,
      )
    }
  }

  Install() {
    this.log(
      yosay(
        `Copy paste the ${chalk.red(
          this.variables.namePascal,
        )} files to the right folders`,
      ),
    )
  }
}

module.exports = SecGenerator
