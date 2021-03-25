'use strict'

const path = require("path")
const chalk = require("chalk")
const yosay = require("yosay")
const Generator = require('yeoman-generator')

const { makeFileTemplate } = require('../utils/getFiles')
const { buildVariables } = require('../utils/buildVariables')

class SecGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
    
    this.argument("name", {
      type: String,
      required: true,
      description: "domain name single"
    });

    this.option("path", {
      alias: "p",
      type: String,
      required: false,
      default: ".",
      description: "path dist"
    });
  }

  Prompting() {
    this.log(
      yosay(
        `Welcome ${chalk.red('SecJS')} generator!`
      )
    );

    this.variables = buildVariables({
      name: this.options.name,
      basePath: this.options.path
    });
  }

  async writing() {
    const dir = path.join(__dirname, "templates/");

    for await (const f of makeFileTemplate(dir, this.variables.name)) {
      this.fs.copyTpl(
        this.templatePath(f.src),
        this.destinationPath(`${this.variables.name}/${f.dist}`),
        this.variables
      );
    }
  }

  Install() {
    this.log(
      yosay(
        `Copy paste the ${chalk.red(this.variables.namePascal)} files to the right folders`
      )
    );
  }
}

module.exports = SecGenerator