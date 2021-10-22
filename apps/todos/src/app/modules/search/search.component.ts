import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'learning-workspace-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  public searchForm: FormGroup;

  @Output() search: EventEmitter<string> = new EventEmitter();

  @Input() initQuery = '';

  private subscription = new Subscription();
  private debounceTime = 500; //ms

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createFormControl();
    this.valueChangesSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  emitSearch(query: string): void {
    this.search.emit(query);
  }

  private valueChangesSubscriptions(): void {
    this.subscription.add(
      this.searchForm.get('search')?.valueChanges
        .pipe(
          debounceTime(this.debounceTime),
        )
        .subscribe((query) => {
          if (!this.searchForm.valid) return;
          this.emitSearch(query);
        })
    );
  }

  private createFormControl(): void {
    this.searchForm = this.fb.group({
      search: [this.initQuery, [Validators.minLength(3)]],
    });
  }
}
