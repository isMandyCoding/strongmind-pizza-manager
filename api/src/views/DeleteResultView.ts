export class DeleteResultView {
  id: number;
  status: "success" | "error";
  constructor(id: number, status: "success" | "error") {
    this.id = id;
    this.status = status;
  }
}