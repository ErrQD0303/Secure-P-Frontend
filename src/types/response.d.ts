// ../types/response.d.ts

export interface IGetAllResponseDto<T> {
  items: T[] | null;
  total_pages: number;
  total_items: number;
}
