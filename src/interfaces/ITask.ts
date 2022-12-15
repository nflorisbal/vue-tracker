import IProject from './IProject';

export default interface ITask {
  description: string;
  timeInSeconds: number;
  project: IProject;
}
