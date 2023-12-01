export interface PaginatedOutputOptions {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
}

export interface OptionsPagination {
  total: number;
  currentPage: number;
  perPage: number;
}


export class Paginated<T> {
  data: T[];
  options: PaginatedOutputOptions

  constructor(data: T[], options: PaginatedOutputOptions) {
    this.data = data
    this.options = options
  }

  static toPagination<U>(data: U[], {
    total,
    perPage,
    currentPage,


  }: OptionsPagination) {

    
    const lastPage = Math.ceil((total / perPage))

    let prev: number | null = null
    let next: number | null = null
    if (currentPage <= lastPage) {
      next = currentPage + 1;
      prev = currentPage - 1
    }



    const options: PaginatedOutputOptions = {
      total,
      perPage,
      currentPage,
      lastPage,
      prev,
      next,
    }

    return new Paginated<U>(
      data,
      options
    )
  }

  transformData(transform: (data: T) => any) {
    return {
      data: this.data.map(transform),
      options: this.options
    }
  }


}