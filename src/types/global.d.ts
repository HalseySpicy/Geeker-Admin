// home
declare namespace Home {
  interface Options {
    value: string;
    label: string;
  }
}

declare namespace Menu {
  interface MenuOptions {
    id: string;
    path: string;
    title: string;
    icon?: string;
    isLink?: string;
    close?: boolean;
    children?: MenuOptions[];
    // [key: string]: any;
  }
}

interface AAA {
  say<T>(value: T): T;
}

interface CCC<T, U> {
  (a: T, b: U): number;
}

declare namespace Table {
  type State = {
    // 表格数据
    tableData: any[];
    // 更多搜索
    searchShow: boolean;
    // 页面组件大小
    tableButtonSize: "small" | "medium" | "large";
    // 是否查看
    isView: boolean;
    // 是否有分页
    isPageable: boolean;
    // 分页器
    pageable: Pageable;
    // 总参数
    totalParam: {
      [key: string]: any;
    };
    // 查询参数
    searchParam: {
      [key: string]: any;
    };
    // 是否点击了搜索
    hasSearched: boolean;
  };
  type Pageable = {
    // 当前页
    pageNum?: number;
    // 每页条数
    pageSize?: number;
    // 总条数
    total?: number;
  };

  interface TableRequest {
    (params: any): any;
  }
}

declare namespace API {
  interface BaseResult<T = any> {
    code: number;
    msg: string;
    data: T;
  }
}

declare type Result<T> = {
  [K in keyof T]: T[K];
};

declare type Params<T> = {
  [K in keyof T]: T[K];
};


