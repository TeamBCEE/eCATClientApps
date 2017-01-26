import { EntityBase } from '../EntityBase';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Person extends EntityBase {
    // Generated code. Do not place code below this line.
    id: number;
    lastName: string;
    firstName: string;

    /// <code> Place custom code between <code> tags
    static resourceName = 'Person';

    /// [Initializer]
    static initializer(entity: Person) { }
    /// </code>

}

