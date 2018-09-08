import { Pipe, PipeTransform } from '@angular/core';
import {Interest} from '../models/Interest';

@Pipe({
  name: 'interestFilter'
})
export class InterestFilterPipe implements PipeTransform {

  transform(interests: Interest[], arg: string): Interest[] {
    if (interests != null) {
      return interests.filter(interest => interest.type === arg);
    } else {
      return null;
    }
  }

}
