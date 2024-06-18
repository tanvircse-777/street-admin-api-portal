import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { Customer } from "./customer.entity";
import { UpdateCustomerDto } from "./customer.dto";
import { CommonStatus } from "src/shared/shared.model";

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly entityManager: EntityManager
  ) {}

  async getAllCustomer(): Promise<Customer[]> {
    const rawQuery = `SELECT * FROM customer where status = '${CommonStatus.ACTIVE}'`;
    return this.entityManager.query(rawQuery);
  }

  async getCustomerById(id: number): Promise<Customer> {
    let customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} does not exist`);
    }
    return this.customerRepository.findOneBy({ id });
  }

  async getCustomerByEmail(email: string): Promise<Customer> {
    let customer = await this.customerRepository.findOneBy({ email });
    if (!customer) {
      throw new NotFoundException(
        `Customer with email ${email} does not exist`
      );
    }
    return this.customerRepository.findOneBy({ email });
  }

  async createCustomer(customer: Partial<Customer>): Promise<Customer> {
    const newCustomer = this.customerRepository.create(customer);
    return this.customerRepository.save(newCustomer);
  }

  async deleteCustomer(id: number) {
    this.getCustomerById(id);
    return this.customerRepository.delete(id);
  }

  async updateCustomer(id: number, requestBody: UpdateCustomerDto) {
    let customer: Customer = await this.getCustomerById(id);
    // customer.givenBy = requestBody.givenBy;
    // customer.status = requestBody.status;
    await this.entityManager.save(customer);

    return customer;
  }
}
