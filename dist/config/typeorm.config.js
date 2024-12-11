"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const accounts_entity_1 = require("../accounts/accounts.entity");
const attendance_entity_1 = require("../attendance/attendance.entity");
const bazar_attendance_entity_1 = require("../bazar-attendance/bazar-attendance.entity");
const customer_entity_1 = require("../customer/customer.entity");
const feedback_entity_1 = require("../feedback/feedback.entity");
const monthly_config_entity_1 = require("../monthly-config/monthly-config.entity");
const other_costs_entity_1 = require("../other-costs/other-costs.entity");
const other_sells_entity_1 = require("../other-sells/other-sells.entity");
const sell_cost_entity_1 = require("../sell-cost/sell-cost.entity");
const sell_entity_1 = require("../sell/sell.entity");
const task_entity_1 = require("../tasks/task.entity");
const transactions_entity_1 = require("../transactions/transactions.entity");
exports.typeOrmConfig = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "dbadmin",
    password: "1234",
    database: "task-management",
    entities: [
        task_entity_1.Task,
        feedback_entity_1.Feedback,
        customer_entity_1.Customer,
        sell_entity_1.Sell,
        sell_cost_entity_1.SellCost,
        other_costs_entity_1.OtherCosts,
        other_sells_entity_1.OtherSells,
        attendance_entity_1.Attendance,
        bazar_attendance_entity_1.BazarAttendance,
        monthly_config_entity_1.MonthlyConfig,
        accounts_entity_1.Accounts,
        transactions_entity_1.Transactions,
    ],
    synchronize: true,
};
//# sourceMappingURL=typeorm.config.js.map