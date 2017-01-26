import { EntityBase } from '../EntityBase';
import { Campus } from './Campus';
import { CourseSection } from './CourseSection';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class CourseOffering extends EntityBase {
   // Generated code. Do not place code below this line.
   id: number;
   courseId: number;
   campusId: number;
   lmsCourseId: string;
   courseName: string;
   academicYear: number;
   termNumber: number;
   alumniLmsCrseOfferId: string;
   offeringStartDate: Date;
   offeringGradDate: Date;
   campus: Campus;
   courseSections: CourseSection[];

   /// <code> Place custom code between <code> tags
   
   /// </code>

}

