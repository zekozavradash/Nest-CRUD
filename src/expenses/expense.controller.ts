import { Controller, Post, Body, Get, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { Expense } from './expenses.entity';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@Body() expense: Partial<Expense>) {
    return this.expensesService.create(expense);
  }

  @Get()
  findAll() {
    return this.expensesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.expensesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateData: Partial<Expense>) {
    return this.expensesService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.expensesService.remove(id);
  }
}
