import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { CommonStatus } from 'src/shared/shared.model';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  mobile_no: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}

export class UpdateCustomerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  mobile_no: string;

  @IsNotEmpty()
  @IsString()
  @IsIn([CommonStatus.ACTIVE, CommonStatus.INACTIVE])
  status: CommonStatus;
}
