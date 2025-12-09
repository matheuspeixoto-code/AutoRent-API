import {v4 as uuidV4} from "uuid"

export class CategoryInMemory {
  id?: string;
  name: string;
  description: string;
  created_at: Date;

  constructor() {
    this.id = uuidV4();
    this.created_at = new Date();
  }
}
