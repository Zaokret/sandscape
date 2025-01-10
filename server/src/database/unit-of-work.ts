import { db, DBContext } from "./database"
import { Repository } from "./repository"

export class UnitOfWork {
  constructor(private context: DBContext) {}

  async execute<T>(work: (repository: Repository) => Promise<T>): Promise<T> {
    return this.context.transaction(async (tx) => {
      return await work(new Repository(tx as unknown as DBContext)) // TODO: make repo accept db context and transaction context type
    })
  }
}

export const uow = new UnitOfWork(db)
