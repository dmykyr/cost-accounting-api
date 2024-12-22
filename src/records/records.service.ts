import { Record } from '../database/models/record';
import { AddRecordDTO } from '../dtos/AddRecordDTO';

export class RecordsService {
  private readonly records: Record[] = [
    {
      id: 1,
      userId: 1,
      categoryId: 2,
      createdAt: new Date('2024-06-01T10:30:00'),
      spendingCosts: 150,
    },
    {
      id: 2,
      userId: 2,
      categoryId: 1,
      createdAt: new Date('2024-06-02T12:15:00'),
      spendingCosts: 200,
    },
    {
      id: 3,
      userId: 3,
      categoryId: 3,
      createdAt: new Date('2024-06-03T14:45:00'),
      spendingCosts: 300,
    },
    {
      id: 4,
      userId: 1,
      categoryId: 1,
      createdAt: new Date('2024-06-04T09:00:00'),
      spendingCosts: 50,
    },
    {
      id: 5,
      userId: 2,
      categoryId: 3,
      createdAt: new Date('2024-06-05T16:20:00'),
      spendingCosts: 400,
    },
    {
      id: 6,
      userId: 3,
      categoryId: 2,
      createdAt: new Date('2024-06-06T11:10:00'),
      spendingCosts: 250,
    },
    {
      id: 7,
      userId: 1,
      categoryId: 3,
      createdAt: new Date('2024-06-07T08:25:00'),
      spendingCosts: 120,
    },
    {
      id: 8,
      userId: 3,
      categoryId: 1,
      createdAt: new Date('2024-06-08T13:35:00'),
      spendingCosts: 180,
    },
    {
      id: 9,
      userId: 2,
      categoryId: 2,
      createdAt: new Date('2024-06-09T17:50:00'),
      spendingCosts: 310,
    },
  ];

  getAllRecords(userId?: number, categoryId?: number): Record[] {
    return this.records.filter((record) => {
      const userMatches = isNaN(categoryId) || record.userId == userId;
      const categoryMatches = isNaN(categoryId) || record.categoryId == categoryId;
      return userMatches && categoryMatches;
    });
  }

  getRecord(recordId: number): Record {
    return this.records.find((record) => record.id == recordId);
  }

  addRecord(dto: AddRecordDTO): Record {
    const maxId = this.records.map((category) => category.id).sort((a, b) => b - a)[0];
    const newRecord = {
      id: maxId + 1,
      ...dto,
      createdAt: new Date(Date.now()),
    };

    this.records.push(newRecord);
    return newRecord;
  }

  deleteRecord(id: number): boolean {
    const userIndex = this.records.findIndex((user) => user.id == id);

    if (userIndex !== -1) {
      this.records.splice(userIndex, 1);
      return true;
    }

    return false;
  }
}
