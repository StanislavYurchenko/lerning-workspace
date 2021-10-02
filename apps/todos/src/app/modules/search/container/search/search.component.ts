import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'learning-workspace-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit{
  public searchForm: FormGroup;

  @Output() searchAction? = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createFormControl();
  }

  onSubmit(): void {
    this.router.navigate(
      [],
      {
        queryParams: {
          search: this.searchForm.get('search')?.value,
        },
      },
    );
    this.searchAction?.emit('searchAction');
  }

  private createFormControl(): void {
    this.searchForm = this.fb.group({
      search: ['', [Validators.minLength(3)]],
    });
  }
}
