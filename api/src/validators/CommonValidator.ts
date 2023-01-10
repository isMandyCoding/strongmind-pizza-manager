import { Length } from "class-validator";
import { IsDefined } from "class-validator/types/decorator/decorators";

export class CommonValidator {
  @IsDefined()
  @Length(0, 50, {
    message: "Name must be under 50 characters"
  })
  name: string;
}