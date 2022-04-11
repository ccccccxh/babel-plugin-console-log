module.exports = function (babel) {
  const { types: t } = babel;

  function isConsoleLogCall(path){
    const { callee } = path.node;
    const {
      object,
      property
    } = callee;
    return t.isMemberExpression(callee) && t.isIdentifier(object, { name: 'console'}) && t.isIdentifier(property, { name: 'log'})
  }
  
  return {
    visitor: {
      CallExpression(path){
        // 判断是console.log
        if(!isConsoleLogCall(path)){
          return;
        }

        const args = path.node.arguments;
        const newArgs = [];

        args.forEach((item, index) => {
          newArgs.push(item);
          // 若前一个类型不存在 或者 前一个类型不是字面量类型
          if(index === 0 || !t.isLiteral(args[index-1])) {
            // 自己不是字面量类型
            if(!t.isLiteral(item)){
              const label = item.name;
              newArgs.splice(newArgs.length - 1, 0, t.stringLiteral(label))
            }
          }
        })
        path.node.arguments = newArgs;
      } 
    }
  };
}