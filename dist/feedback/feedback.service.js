"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const feedback_entity_1 = require("./feedback.entity");
const feedback_status_enum_1 = require("./feedback-status.enum");
let FeedbackService = class FeedbackService {
    constructor(feedbackRepository, entityManager) {
        this.feedbackRepository = feedbackRepository;
        this.entityManager = entityManager;
    }
    async getAllFeedback() {
        const rawQuery = `SELECT * FROM feedback where status = '${feedback_status_enum_1.FeedbackStatus.ACTIVE}'`;
        return this.entityManager.query(rawQuery);
    }
    async getFeedbackById(id) {
        let feedback = await this.feedbackRepository.findOneBy({ id });
        if (!feedback) {
            throw new common_1.NotFoundException(`Feedback with id ${id} does not exist`);
        }
        return this.feedbackRepository.findOneBy({ id });
    }
    async createFeedback(feedback) {
        const newFeedback = this.feedbackRepository.create(feedback);
        return this.feedbackRepository.save(newFeedback);
    }
    async deleteFeedback(id) {
        this.getFeedbackById(id);
        return this.feedbackRepository.delete(id);
    }
    async updateFeedback(id, requestBody) {
        let feedback = await this.getFeedbackById(id);
        feedback.givenBy = requestBody.givenBy;
        feedback.status = requestBody.status;
        await this.entityManager.save(feedback);
        return feedback;
    }
};
exports.FeedbackService = FeedbackService;
exports.FeedbackService = FeedbackService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(feedback_entity_1.Feedback)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.EntityManager])
], FeedbackService);
//# sourceMappingURL=feedback.service.js.map