export type TransactionBoundary = {
  commit(): Promise<void>;
  rollback(): Promise<void>;
};

export async function runInTransaction<T>(boundary: TransactionBoundary, handler: () => Promise<T>) {
  try {
    const result = await handler();
    await boundary.commit();
    return result;
  } catch (error) {
    await boundary.rollback();
    throw error;
  }
}
