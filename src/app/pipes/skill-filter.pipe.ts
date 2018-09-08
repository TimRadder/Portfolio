import { Pipe, PipeTransform } from '@angular/core';
import { Skill } from '../models/Skill';

@Pipe({
  name: 'skillFilter'
})
export class SkillFilterPipe implements PipeTransform {

  transform(skills: Skill[], arg: string): Skill[] {

    if (skills != null) {
      return skills.filter(skill => skill.type === arg);
    }

    return null;
  }

}
