"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const customer_entity_1 = require("../customer/customer.entity");
const feedback_entity_1 = require("../feedback/feedback.entity");
const task_entity_1 = require("../tasks/task.entity");
exports.typeOrmConfig = {
    type: "postgres",
    host: "cppgl6uehbks73c2bjkg-a.oregon-postgres.render.com",
    port: 5432,
    username: "street_admin_database_user",
    password: "uKzXF4qqPIPssy9Uka2sNQ13jbUmbgpz",
    database: "street_admin_database",
    entities: [task_entity_1.Task, feedback_entity_1.Feedback, customer_entity_1.Customer],
    synchronize: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
};
//# sourceMappingURL=typeorm.config.js.map