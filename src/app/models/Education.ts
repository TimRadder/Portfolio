import { Award } from './Awards';

export interface Education {
    id?: number;
    school?: string;
    gradDate?: string;
    course?: string;
    schoolID?: string;
    awards?: Award[];
}
