import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../core/services/employee.service';
import { Employee } from '../../core/models/employee.model';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ToolbarModule,
    ButtonModule,
    SelectModule,
    FormsModule,
    AvatarModule,
    CommonModule,
    TranslatePipe
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {

  employees: Employee[] = [];

  selectedEmployee!: Employee;

  languages = [
    { label: 'Deutsch', value: 'de' },
    { label: 'English', value: 'en' }
  ];

  selectedLanguage = 'en';

  constructor(
    private employeeService: EmployeeService,
    private translateService: TranslateService
  ) { }


  ngOnInit(): void {


    const savedLanguage = localStorage.getItem('language') || 'en';
    this.selectedLanguage = savedLanguage;
    this.translateService.use(savedLanguage);

    this.translateService.get('DASHBOARD.TITLE').
      subscribe(value => console.log('Translation:', value));

    this.employeeService.getEmployees()
      .subscribe(data => {



        this.employees = data;

        if (data.length > 0) {

          const storedId = Number(
            localStorage.getItem('employeeId')
          );

          this.selectedEmployee =
            data.find(
              employee => employee.id === storedId
            ) ?? data[0];

          localStorage.setItem(
            'employeeId',
            String(this.selectedEmployee.id)
          );
        }

      });
  }


  onEmployeeChange(): void {

    localStorage.setItem(
      'employeeId',
      String(this.selectedEmployee.id)
    );

    console.log(
      'Selected Employee:',
      this.selectedEmployee.name
    );
  }


  changeLanguage(language: string): void {
    console.log('Selected language:', language);
    this.selectedLanguage = language;
    this.translateService.use(language);
    localStorage.setItem('language', language);
  }
}