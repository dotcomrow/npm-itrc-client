const conf = new (require('conf'))()
const chalk = require('chalk')
const config = new Conf({projectName: 'foo'});

function list () {
    const todoList = conf.get('todo-list')

    if (todoList && todoList.length) {
        console.log(
            chalk.blue.bold('Tasks in green are done. Tasks in yellow are still not done.')
        )
        todoList.forEach((task, index) => {
            if (task.done) {
                console.log(
                    chalk.greenBright(`${index}. ${task.text}`)
                )
            } else {
                console.log(
                    chalk.yellowBright(`${index}. ${task.text}`)
                )
            }
        })
    } else {
        console.log(
            chalk.red.bold('You don\'t have any tasks yet and this message was updated! foo value -> ' + config.get('foo'))
        )
    }
}

module.exports = list