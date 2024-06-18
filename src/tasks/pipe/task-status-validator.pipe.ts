// import { BadRequestException, PipeTransform } from '@nestjs/common';
// import { TaskStatus } from '../task-status.enum';

// export class TaskStatusValidator implements PipeTransform {
//   readonly allowedStatus = [
//     TaskStatus.DONE,
//     TaskStatus.IN_PROGRESS,
//     TaskStatus.OEPN,
//   ];
//   transform(value: any) {
//     if (!this.isStatusValid(value)) {
//       throw new BadRequestException(`${value} is not allowed status value`);
//     }
//     return value;
//   }

//   isStatusValid(status) {
//     let index = this.allowedStatus.indexOf(status);
//     return index !== -1;
//   }
// }
