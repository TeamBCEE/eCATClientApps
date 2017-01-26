import { EntityBase } from '../EntityBase';
import { CourseOffering } from './CourseOffering';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Campus extends EntityBase {
   // Generated code. Do not place code below this line.
   id: number;
   mpLmsMatchKey: string;
   lmsAlumniFacultyGroupId: string;
   campusName: string;
   campusZip: number;
   courseOfferings: CourseOffering[];

   /// <code> Place custom code between <code> tags
   
   /// </code>

}

