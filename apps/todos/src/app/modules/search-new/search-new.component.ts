import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'learning-workspace-search-new',
  templateUrl: './search-new.component.html',
  styleUrls: ['./search-new.component.scss'],
})
export class SearchNewComponent implements OnInit, OnDestroy {
  public searchForm: FormGroup;

  @Output() search: EventEmitter<string> = new EventEmitter();

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
      search: ['', [Validators.minLength(3)]],
    });
  }
}
