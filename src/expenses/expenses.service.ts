import { Injectable, NotFoundException } from '@nestjs/common';
import { Expense } from './expenses.entity';

@Injectable()
export class ExpensesService {
  private expenses: Expense[] = [];
  private idCounter = 1;

  create(expense: Partial<Expense>): Expense {
    const newExpense: Expense = {
      id: this.idCounter++,
      name: expense.name,
      amount: expense.amount,
      description: expense.description,
      date: new Date(),
    };
    this.expenses.push(newExpense);
    return newExpense;
  }

  findAll(): Expense[] {
    return this.expenses;
  }

  findOne(id: number): Expense {
    const expense = this.expenses.find(exp => exp.id === id);
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }
    return expense;
  }

  update(id: number, updateData: Partial<Expense>): Expense {
    const expense = this.findOne(id);
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }
    Object.assign(expense, updateData);
    return expense;
  }

  remove(id: number): void {
    const index = this.expenses.findIndex(exp => exp.id === id);
    if (index === -1) {
      throw new NotFoundException('Expense not found');
    }
    this.expenses.splice(index, 1);
  }
}
