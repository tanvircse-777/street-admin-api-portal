"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const customer_entity_1 = require("../customer/customer.entity");
const feedback_entity_1 = require("../feedback/feedback.entity");
const task_entity_1 = require("../tasks/task.entity");
exports.typeOrmConfig = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "dbadmin",
    password: "1234",
    database: "task-management",
    entities: [task_entity_1.Task, feedback_entity_1.Feedback, customer_entity_1.Customer],
    synchronize: true,
};
//# sourceMappingURL=typeorm.config.js.map