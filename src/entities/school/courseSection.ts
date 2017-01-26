import { EntityBase } from '../EntityBase';
import { CourseOffering } from './CourseOffering';
import { FacultySectionMbr } from './FacultySectionMbr';
import { StudentSectionMbr } from './StudentSectionMbr';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class CourseSection extends EntityBase {
   // Generated code. Do not place code below this line.
   id: number;
   courseOfferId: number;
   primaryFacultyId: number;
   courseOffer: CourseOffering;
   facSectionMbrs: FacultySectionMbr[];
   studSectionMbrs: StudentSectionMbr[];

   /// <code> Place custom code between <code> tags
   
   /// </code>

}

