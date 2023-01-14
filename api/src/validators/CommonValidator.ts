import { Length, IsDefined } from "class-validator";

export class CommonValidator {
  @IsDefined()
  @Length(1, 50, {
    message: "Name must be between 1 and 50 characters"
  })
  name: string;
}