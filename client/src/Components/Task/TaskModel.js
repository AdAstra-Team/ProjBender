export class TaskModel {
    constructor(id, type, title, description, status, assignee, priority) {
      this.id = id;
      this.type = type;
      this.title = title;
      this.description = description;
      this.status = status;
      this.assignee = assignee;
      this.priority = priority;
    }
  }