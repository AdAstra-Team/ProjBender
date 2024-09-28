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

export const TaskType = Object.freeze({
    BUG: 'bug',
    FEATURE: 'feature',
    STORY: 'story',
    TEST: 'test'
});
