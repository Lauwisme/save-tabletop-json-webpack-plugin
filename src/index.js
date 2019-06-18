import tabletop from 'tabletop'
import fs from 'fs'

module.exports = class SaveRemoteFilePlugin {
  constructor(options) {
    if (options instanceof Array) {
      this.options = options;
    } else {
      this.options = [options];
    }
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      {
        name: 'SaveTabletopJsonWebpackPlugin',
        context: true
      },
      (context, compilation, callback) => {
        let count = this.options.length
        const tabletopInit = option => {
          const onLoadTabletopData = data => {
            for (const key in data) {
              const obj = data[key]
              console.log(key)
              const dataString = JSON.stringify(obj.elements, null, 4)

              fs.writeFileSync(option.outputDir + key + '.json', dataString)
            }
          }
          option.callback = onLoadTabletopData;
          tabletop.init(option);
        }
        this.options.forEach(tabletopInit)
      });
  }
};
