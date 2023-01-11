import { Common } from "../database/entities/Common";

export interface CommonViewParams {
  id?: number;
  name?: string;
}

export class CommonView {
  id?: number;
  name: string;
  constructor(common: CommonViewParams) {
    this.id = common.id;
    this.name = common.name ?? "";
  }
}