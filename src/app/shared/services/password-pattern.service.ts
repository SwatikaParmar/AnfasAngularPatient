import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PasswordPatternService {
  public getPasswordPattern(): string {
    return ('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[d$@$!%*?&#])[A-Za-z\\dd$@$!%*?&#]{6,}');
  }
}
