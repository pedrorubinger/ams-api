export interface IPaginatedResult<T> {
  // data: T
  lastKey?: string | null
  total: number
  count: number
}
