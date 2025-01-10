import { db } from "./database"
import { transactions } from "./schemas/transactions"

class Queue<T> {
  private array: T[] = []
  constructor() {}
  add(...items: T[]) {
    this.array.unshift(...items)
  }
  pull(count: number): T[] {
    let start = this.array.length - count
    return this.array.splice(start < 0 ? 0 : start, count)
  }
  all(): ReadonlyArray<T> {
    return this.array as ReadonlyArray<T>
  }
  get length(): number {
    return this.array.length
  }
}

export type Transaction = typeof transactions.$inferInsert & { createdAt: number /* timestamp in ms */ }
export const transactionQueue = new Queue<Transaction>()

// insert 1000 transactions from the queue every minute
// if there is more than a 1000 transactions send an alert to a discord channel
setInterval(() => {
  const batch = transactionQueue.pull(1000)
  db.insert(transactions)
    .values(batch)
    .catch((err) => {
      console.log(err)
      transactionQueue.add(...batch)
    })
}, 60 * 1000)
