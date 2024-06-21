import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
} from "@nestjs/common";
import { Customer } from "./customer.entity";
import { CustomerService } from "./customer.service";
import { CreateCustomerDto, UpdateCustomerDto } from "./customer.dto";

@Controller("customer")
export class CustomerController {
  constructor(private _customerService: CustomerService) {}
  @Get()
  getAllCustomer(): Promise<Customer[]> {
    return this._customerService.getAllCustomer();
  }

  @Get("/:id")
  getCustomerById(@Param("id") id: number): Promise<Customer> {
    return this._customerService.getCustomerById(Number(id));
  }

  @Get("/info/:email")
  getCustomerByEmail(@Param("email") email: string): Promise<Customer> {
    return this._customerService.getCustomerByEmail(email);
  }

  @Get("/is-customer-exist/:email")
  isCustomerExist(
    @Param("email") email: string
  ): Promise<{ isCustomerExist: boolean }> {
    return this._customerService.isCustomerExist(email);
  }

  @Post()
  createCustomer(@Body() requestBody: CreateCustomerDto) {
    return this._customerService.createCustomer(requestBody);
  }

  @Delete("delete/:id")
  deleteCustomer(@Param("id") id: number) {
    return this._customerService.deleteCustomer(Number(id));
  }

  @Patch("update/:id")
  updateCustomer(
    @Param("id") id: number,
    @Body() requestBody: UpdateCustomerDto
  ) {
    return this._customerService.updateCustomer(Number(id), requestBody);
  }
}
