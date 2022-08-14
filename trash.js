// sql = insertRole;
//             let choices = await getArray(sql1); // new code
//             let params = [];
//             inquirer.prompt([{
//                 type: 'text',
//                 name: 'roleName',
//                 message: "What is the name of the role?",
//                 default: 'Server'
//                 },
//                 {
//                 type: 'number',
//                 name: 'salary',
//                 message: "What is the salary of the role?",
//                 default: '25000'
//                 },
//                 {
//                 type: 'choices',
//                 name: 'department',
//                 message: "Which department does it belong to?",
//                 choices: choices
//                 }]).then(({ roleName, salary, department }) => {
//                         params.push(roleName, salary, department); 
//                         console.log('params', params); 
//                         queryDbwithEdits(sql, params);
//                         });