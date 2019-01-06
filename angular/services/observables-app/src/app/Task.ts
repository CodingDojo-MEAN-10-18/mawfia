export class Task {
    constructor(
	  public _id: string = "";
      public title: string = "",
	  public description: string = "",
	  public completed: boolean = false,
	  public createdAt: Date,
	  public updatedAt: Date
  ){}
}
