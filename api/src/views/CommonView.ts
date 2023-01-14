export interface CommonViewParams {
  id?: number;
  name?: string;
}

export class CommonView {
  id?: number;
  name: string;
  constructor(common: CommonViewParams) {
    this.id = common  .id ?? 0;
    this.name = common.name ?? "";
  }
}